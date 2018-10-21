import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
} from '@angular/material';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';

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
        MatIconModule,
        MatTooltipModule,
        MatAutocompleteModule,
        ScrollDispatchModule
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
        MatIconModule,
        MatTooltipModule,
        MatAutocompleteModule,
        ScrollDispatchModule
    ]
})

export class MaterialModule { }
