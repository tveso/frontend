import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from '../../services/comment.service';
import {UserServiceService} from '../../services/user-service.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {

  @Input() resource = null;
  comments: Array<any> = [];
  model: any = {};
  loading = false;
  loadingComments = true;
  options = {
      spellChecker: false,
      placeholder: 'Escribe un comentario...'
  };
  constructor(private commentService: CommentService, private userService: UserServiceService) { }

  ngOnInit() {
      this.loadingComments = true;
      this.commentService.get(this.resource).subscribe((res) => {
          this.comments = res;
          this.loadingComments = false;
      });
  }
  post(data) {
      data.parent = this.resource;
      data.date = new Date().getTime();
      data.author = [this.userService.getUser()];
      this.loading = true;
      this.model = {};
      this.comments.push(data);
      this.commentService.add(data).subscribe((dat) => {
          this.loading = false;
      });
  }

    getChildrens(comment: any) {
        const id = comment._id;
        const com =  this.comments.filter((a) => {
            return a.parent === id;
        });
        return com;
    }
    getCurrentComments() {
      return this.comments.filter((a) => {
          return a.parent === this.resource;
      });
    }
}
