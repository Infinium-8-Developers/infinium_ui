import { Component } from '@angular/core';

@Component({
  selector: 'app-inputs',
  template: `
    <h3 class="mb-3">Input type="text"</h3>

    <h4 class="mb-2">Disabled = true</h4>

    <div class="form__field">
      <label for="test-id1">Label</label>
      <input
        class="form__field--input"
        disabled
        id="test-id1"
        name="test1"
        placeholder="Enter a name here"
        type="text"
      />
    </div>

    <h4 class="mb-3">Without label</h4>

    <div class="form__field">
      <input
        class="form__field--input"
        name="test1"
        placeholder="Enter a name here"
        type="text"
      />
    </div>

    <div class="form__field">
      <input
        class="form__field--input"
        name="test1"
        placeholder="Enter a name here"
        type="text"
        value="Name"
      />
    </div>

    <h3 class="mb-3">Input type="password"</h3>

    <h4 class="mb-2">Disabled = true</h4>

    <div class="form__field">
      <label for="test-id4">Label</label>
      <input
        class="form__field--input"
        disabled
        id="test-id4"
        name="test1"
        placeholder="Enter a name here"
        type="password"
        value="Name"
      />
    </div>

    <h4 class="mb-3">Without label</h4>

    <div class="form__field">
      <input
        class="form__field--input"
        name="1234567890"
        placeholder="Enter a name here"
        type="password"
        value="Name"
      />
    </div>

    <h4 class="mb-3">With error</h4>

    <div class="form__field">
      <input
        class="form__field--input invalid"
        name="1234567890"
        placeholder="Enter a name here"
        type="password"
        value="Name"
      />
      <div class="error">Error text</div>
    </div>

    <h4 class="mb-3">With success</h4>

    <div class="form__field">
      <input
        class="form__field--input"
        name="1234567890"
        placeholder="Enter a name here"
        type="password"
        value="Name"
      />
      <div class="success">Success text</div>
    </div>
  `,
  styles: [],
  standalone: true,
})
export class InputsComponent {}
