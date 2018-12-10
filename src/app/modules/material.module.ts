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
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {NgModule} from '@angular/core';
import {MatRippleModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
@NgModule({
    imports: [
        MatMenuModule,
        MatRippleModule,
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
        MatExpansionModule,
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
        MatRippleModule,
        MatIconModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatExpansionModule,
    ]
})

export class MaterialModule { }
