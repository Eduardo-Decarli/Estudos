import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comp1',
  imports: [],
  templateUrl: './comp1.html',
  styleUrl: './comp1.scss',
})
export class Comp1 implements OnInit {

  @Input() nome: string = ''

  ngOnInit() {
    console.log('ngOnInit comp1');

    console.log(this.nome);
  }
}
