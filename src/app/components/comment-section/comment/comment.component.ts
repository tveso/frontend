import {Component, Input, OnInit} from '@angular/core';
import {UserServiceService} from '../../../services/user-service.service';
import {CommentService} from '../../../services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment;
  showReply = false;
  loading = false;
  @Input() comments = [];
  model: object = {};
  public id: string;
  constructor(private userService: UserServiceService, private commentService: CommentService) { }
    options = {
        spellChecker: false,
        placeholder: 'Escribe un comentario...'
    };

  ngOnInit() {
    this.id = this.getId();

  }

    getId = function() {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };
    post(data) {
        data.parent = this.comment._id;
        data.date = new Date().getTime();
        data.author = this.userService.getUser();
        this.loading = true;
        this.model = {};
        this.comments.push(data);
        this.showReply = false;
        this.commentService.add(data).subscribe((dat) => {
            this.loading = false;
        });
    }

    getCurrentComments() {
        return this.comments.filter((a) => {
            return a.parent === this.comment._id;
        });
    }


    getChildrens(comment: any) {
        const id = comment._id;
        return this.comments.filter((a) => {
            return a.parent === id;
        });
    }
}
