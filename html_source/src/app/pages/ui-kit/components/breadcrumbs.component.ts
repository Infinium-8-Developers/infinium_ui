import { Component } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  template: `
    <h3>Default</h3>
    <div class="breadcrumbs mb-2">
      <div class="breadcrumb">
        <a>test 1 (link)</a>
      </div>
      <div class="breadcrumb">
        <span>test 2 (text)</span>
      </div>
      <div class="breadcrumb">
        <a>test 3 (link)</a>
      </div>
      <div class="breadcrumb">
        <span>test 4 (text)</span>
      </div>
      <div class="breadcrumb">
        <a>test 5 (link)</a>
      </div>
      <div class="breadcrumb">
        <a>test 6 (link)</a>
      </div>
      <div class="breadcrumb">
        <span>last item (text)</span>
      </div>
    </div>

    <h3>With scroll</h3>
    <div class="breadcrumbs scrolled mb-2">
      <div class="breadcrumb">
        <a>test 1 (link)</a>
      </div>
      <div class="breadcrumb">
        <span>test 2 (text)</span>
      </div>
      <div class="breadcrumb">
        <a>test 3 (link)</a>
      </div>
      <div class="breadcrumb">
        <span>test 4 (text)</span>
      </div>
      <div class="breadcrumb">
        <a>test 5 (link)</a>
      </div>
      <div class="breadcrumb">
        <a>test 6 (link)</a>
      </div>
      <div class="breadcrumb">
        <a>test 7 (link)</a>
      </div>
      <div class="breadcrumb">
        <span>test 8 (text)</span>
      </div>
      <div class="breadcrumb">
        <a>test 9 (link)</a>
      </div>
      <div class="breadcrumb">
        <span>test 10 (text)</span>
      </div>
      <div class="breadcrumb">
        <a>test 11 (link)</a>
      </div>
      <div class="breadcrumb">
        <a>test 12 (link)</a>
      </div>
      <div class="breadcrumb">
        <span>last item (text)</span>
      </div>
    </div>
  `,
  styles: [],
  standalone: true,
})
export class BreadcrumbsComponent {}
