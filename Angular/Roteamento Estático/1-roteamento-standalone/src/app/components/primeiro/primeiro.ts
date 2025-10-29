import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-primeiro',
  imports: [],
  templateUrl: './primeiro.html',
  styleUrl: './primeiro.scss',
})
export class Primeiro implements OnInit, OnDestroy{
  ngOnDestroy(): void {
    console.log('Primeiro Componente OnDestroy')
  }
  ngOnInit(): void {
    console.log('Primeiro Componente OnInit')
  }

}
