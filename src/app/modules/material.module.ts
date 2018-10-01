import {
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatTabsModule, MatIconModule,
} from '@angular/material';
import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
    imports: [
        MatMenuModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        MatInputModule,
        MatSnackBarModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatTabsModule,
        MatIconModule

    ],
    exports: [
        MatMenuModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        MatInputModule,
        MatSnackBarModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatTabsModule,
        MatIconModule
    ]
})

export class MaterialModule { }
