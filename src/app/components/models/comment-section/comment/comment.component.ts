import {Component, OnInit, ViewChild, ViewContainerRef,} from '@angular/core';
import {CommentService} from '../../../../services/comment.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Commentable} from '../../../../entities/commentable';
import {SecurityService} from '../../../../services/security.service';
import {ConfirmDialogComponent} from '../../../utils/confirm-dialog/confirm-dialog.component';
import {SimpleMdService} from '../../../../services/simple-md-service';
import {MarkdownService} from 'ngx-markdown';
import {ExtraMdTagsPipe} from '../../../../pipes/extra-md-tags.pipe';
import {DomSanitizer} from '@angular/platform-browser';
import {UserService} from '../../../../services/user.service';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css'],
    providers: [ExtraMdTagsPipe],
    preserveWhitespaces: true
})
export class CommentComponent extends Commentable implements OnInit {
    test = '<app-spinner></app-spinner>';
    getId = function () {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };
    protected id;
    @ViewChild('dynamicContentPlaceHolder', {read: ViewContainerRef})
    protected dynamicComponentTarget: ViewContainerRef;
    private formatedComment = null;

    constructor(userService: UserService, commentService: CommentService, matSnackbar: MatSnackBar,
                public securityService: SecurityService, public dialog: MatDialog,
                simpleMde: SimpleMdService, private markdownService: MarkdownService,
                private extraMdTagsPipe: ExtraMdTagsPipe, private sanitizer: DomSanitizer) {
        super(commentService, userService, matSnackbar, simpleMde);
    }

    ngOnInit() {
        this.id = this.getId();
        this.getCommentText();
    }

    like() {
        this.comment.userLike = !this.comment.userLike;
        this.comment.dislikes += (this.comment.userDislike) ? -1 : 0;
        this.comment.userDislike = false;
        this.comment.likes += (this.comment.userLike) ? 1 : -1;
        this.commentService.like(this.comment._id).subscribe((data) => {
        });
    }

    dislike() {
        this.comment.userDislike = !this.comment.userDislike;
        this.comment.likes += (this.comment.userLike) ? -1 : 0;
        this.comment.userLike = false;
        this.comment.dislikes += (this.comment.userDislike) ? 1 : -1;

        this.commentService.dislike(this.comment._id).subscribe((data) => {
        });
    }

    getCommentText() {
        if (this.formatedComment === null) {
            let result = this.markdownService.compile(this.comment.text);
            result = this.extraMdTagsPipe.transform(result);
            this.formatedComment = result;
        }
        return this.formatedComment;
    }


    getClassLike(type) {
        type = type.charAt(0).toUpperCase() + type.slice(1);
        return this.comment['user' + type] ? 'active' : '';
    }

    delete() {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'Borrar comentario', message: `Vas a borrar un comentario de manera temporal,
          podrás restaurarlo en un plazo de 30 días`
            }
        });
        dialogRef.afterClosed().subscribe((a) => {
            if (a === true) {
                this.commentService.delete(this.comment._id).subscribe((a) => {
                    this.comment.deleted = true;
                });
            }
        });
    }

}
