import {Component, OnInit} from '@angular/core';
import {CommentService} from '../../../services/comment.service';
import {MatSnackBar} from '@angular/material';
import {Commentable} from '../../../entities/commentable';
import {ActivatedRoute} from '@angular/router';
import {SimpleMdService} from '../../../services/simple-md-service';
import {UserService} from '../../../services/user.service';

@Component({
    selector: 'app-comment-section',
    templateUrl: './comment-section.component.html',
    styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent extends Commentable implements OnInit {
    loadingComments: boolean;
    seeComment = null;
    private originalResource: any;
    private originalComments: Array<any>;
    private page = 1;
    private lastResult = [1];

    constructor(commentService: CommentService, userService: UserService, matSnackbar: MatSnackBar,
                private activatedRouter: ActivatedRoute, simpleMde: SimpleMdService) {
        super(commentService, userService, matSnackbar, simpleMde);
    }

    ngOnInit(): void {
        this.originalResource = this.resource;
        this.originalComments = this.comments;
        this.activatedRouter.queryParams.subscribe((a) => {
            if (typeof a.comment_id !== 'undefined') {
                this.resource = a.comment_id;
                this.seeComment = true;
                this.commentService.get(this.resource).subscribe((coms) => {
                    this.comments = coms;
                });
            } else {
                this.resource = this.originalResource;
                this.seeComment = null;
                this.comments = this.originalComments;
            }
        });
    }

    getActiveComments() {
        return this.comments.filter((a) => {
            return a.cancelled !== true;
        });
    }

    getMoreComments() {
        if (this.lastResult.length === 0) {
            return;
        }
        this.page += 1;
        this.loadingComments = true;
        this.commentService.get(this.resource, this.page).subscribe((a) => {
            this.comments = this.comments.concat(a);
            this.lastResult = a;
            this.loadingComments = false;
        });
    }
}
