import {Input} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {CommentService} from '../services/comment.service';
import {FormControl, FormGroup} from '@angular/forms';
import {SimpleMdService} from '../services/simple-md-service';
import {UserService} from '../services/user.service';

export class Commentable {
    @Input() resource = null;
    @Input() comments: Array<any> = [];
    model: any = {};
    @Input() depth = 1;
    loading = false;
    showReply = false;
    @Input() comment;
    public options: any;
    protected   commentForm = new FormGroup({
        text: new FormControl('')
    });

    constructor(protected commentService: CommentService, protected userService: UserService, protected matSnackbar: MatSnackBar,
                private SMDE: SimpleMdService) {
        this.options = SMDE.options;

    }

    post(data, parent) {
        console.log(data);
        this.loading = true;
        this.model = {};
        data.parent =  parent;
        data.author = this.userService.getUser();
        console.log(data.author);
        data.likes = 0;
        data.dislikes = 0;
        data.author._id = data.author.id;
        this.commentService.add(data).subscribe((dat) => {
            this.showReply = false;
            data.date = new Date().getTime() / 1000;
            data._id = dat.id;
            this.comments.push(data);
            this.commentForm.reset();
            this.loading = false;
            this.matSnackbar.open('Comentario añadido correctamente', 'CERRAR', {duration: 1000});
        });
    }
    getCurrentComments(id) {
        const result = this.comments.filter((a) => {
            return a.parent === id;
        });
        result.sort((a, b) => {
           const points = (b.likes - b.dislikes) - (a.likes - a.dislikes);
           const popular = (b.likes + b.dislikes) - (a.likes - a.dislikes);
           if (points === 0 && popular === 0) {
               return b.date - a.date;

           }
           if (points === 0) {
               return popular;
           }

           return points;
        });

        return result;
    }


}
