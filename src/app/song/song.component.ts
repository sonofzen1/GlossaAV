import { Component } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Song } from '../models/song.model';
import { Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-song',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './song.component.html',
  styleUrl: './song.component.css'
})
export class SongComponent {
    @Input() song!: Song;
}
