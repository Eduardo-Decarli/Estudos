import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-segundo',
  imports: [],
  templateUrl: './segundo.html',
  styleUrl: './segundo.scss',
})
export class Segundo implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    console.log('Segundo Componente OnDistroy');
  }
  ngOnInit(): void {
    console.log('Segundo Componente OnInit')
  }

}
