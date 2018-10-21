import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogEpisodeToWatchComponent} from '../../sections/welcome/welcome.component';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
    public title: any = 'Confirmar acción';
    public message: '¿Estás seguro de querer realizar la acción?';
    public confirmButton: 'Confirmar';
    public cancelButton: 'Cancelar';

    constructor(
        public dialogRef: MatDialogRef<DialogEpisodeToWatchComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.title = (typeof data.title !== 'undefined') ? data.title : this.title;
        this.message = (typeof data.message !== 'undefined') ? data.message : this.message;
        this.confirmButton = (typeof data.confirmButton !== 'undefined') ? data.confirmButton : 'Confirmar';
        this.cancelButton = (typeof data.cancelButton !== 'undefined') ? data.cancelButton : 'Cancelar';
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    closeDialog() {
        this.dialogRef.close();
    }


}