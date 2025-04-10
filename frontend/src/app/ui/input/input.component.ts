import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() additionalClass: string = '';
  @Input() placeholder: string = '';
  @Input() placeholderClass: string = '';
  @Input() value: string = '';
  @Input() type: string = 'text';
  @Input() icon?: string = '';
  @Output() onChange = new EventEmitter<string>();

  handleChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange.emit(value);
  }
}
