import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.scss']
})
export class UploadfileComponent implements OnInit {

  @ViewChild('fileInput') fileInput;
  file: File;
  @ViewChild('imgPreview') imgPreview;
  error$: Subject<any> = new Subject();
  private reader = new FileReader();
  errors: Array<string> = [];
  @Output() output: EventEmitter<any> = new EventEmitter<any>();
  @Output() preview: EventEmitter<any> = new EventEmitter<any>();
  @Input() bottonText: any;
  constructor() { }

  ngOnInit() {
      this.error$.asObservable().subscribe((a) => {
          this.file = null;
          this.fileInput.nativeElement.value = '';
          this.imgPreview.nativeElement.src = '';
          this.errors = [];
          this.errors.push(a);
      });
  }

  addFile() {
    this.fileInput.nativeElement.click();
  }


    onFilesAdded() {
        const files: Array<File> = this.fileInput.nativeElement.files;
        if (files.length > 0) {
            this.file = files[0];
            this.reader.onload = () => {
                this.imgPreview.nativeElement.src = this.reader.result;
                setTimeout(this.checkImgDimensions.bind(this), 10);
            };
            this.reader.readAsDataURL(this.file);
        }
    }

    private checkImgDimensions() {
        const width = this.imgPreview.nativeElement.naturalWidth;
        const heigth = this.imgPreview.nativeElement.naturalHeight;
        const allowed = width <= 400 && heigth <= 400;
        if (allowed === false) {
            this.error$.next('Dimensiones no soportada, recuerda: 400px máximo de altura y anchura y menos de 5Mb de tamaño');
        } else {
            this.errors = [];
            this.output.emit(this.file);
            this.preview.emit(this.imgPreview.nativeElement.src);
        }
    }
}
