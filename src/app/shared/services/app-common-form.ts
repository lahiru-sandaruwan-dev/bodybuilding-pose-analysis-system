import { UntypedFormGroup } from "@angular/forms";

export class CommonForm {
  formGroup: UntypedFormGroup;
  constructor() {
    this.formGroup = new UntypedFormGroup({});
  }

  //formControl as comma separate ::  stringControlls = "Name,Location,Department"
  validateControllers(stringControlls: any) {
    const array = stringControlls.split(",");
    let errorCount: number = 0;
    array.forEach((controlls: any) => {
      if (this.formGroup.controls[controlls].invalid) {
        errorCount = errorCount + 1;
        this.formGroup.controls[controlls].markAsDirty();
      }
    });
    if (errorCount > 0) {
      return true;
    } else {
      return false;
    }
  }

  disableFormControlls() {
    Object.keys(this.formGroup.controls).forEach((field) => {
      const control = this.formGroup.get(field)?.disable();
    });
  }

  getError(name: string) {
    let item = this.formGroup.get(name);
    if (this.validation != null && (item?.dirty || item?.touched)) {
      for (const [key, value] of Object.entries(this.validation)) {
        if (item.hasError(key)) {
          return value;
        }
      }
    } else {
      return "";
    }

    return "";
  }

  reset() {
    this.formGroup.reset();
  }

  showErrors() {
    Object.keys(this.formGroup.controls).forEach((field) => {
      const control = this.formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
      control?.markAsDirty();
    });
  }

  setValue(name: string, value: any) {
    try {
      this.formGroup.get(name)?.setValue(value);
      return true;
    } catch (error) {
      return false;
    }
  }

  getValue(name: string) {
    try {
      return this.formGroup.get(name)?.value;
    } catch (error) {
      return null;
    }
  }

  getTrimValue(name: string) {
    try {
      let value = this.formGroup.get(name)?.value;
      if (value != null) {
        return value.trim();
      } else {
        return value;
      }
    } catch (error) {
      return null;
    }
  }

  clearValue(name: string) {
    this.formGroup.controls[name].reset();
    this.formGroup.controls[name].markAsUntouched();
  }

  clearValues(names: string) {
    let array = names.split(",");
    array.forEach((name: any) => {
      this.formGroup.controls[name].reset();
      this.formGroup.controls[name].markAsUntouched();
    });
  }

  setInvalid(name: string) {
    try {
      this.formGroup.get(name)?.setErrors({ invalid: true });
      return true;
    } catch (error) {
      return false;
    }
  }

  setValid(name: string) {
    try {
      this.formGroup.get(name)?.setErrors(null);
      return true;
    } catch (error) {
      return false;
    }
  }

  disableField(name: string) {
    try {
      this.formGroup.get(name)?.disable();
      return true;
    } catch (error) {
      return false;
    }
  }

  enableField(name: string) {
    try {
      this.formGroup.get(name)?.enable();
      return true;
    } catch (error) {
      return false;
    }
  }

  focus(name: string) {
    document.getElementById(name)?.focus();
  }

  validation = {
    invalid: "This field is invalid!",
    required: "This field is required!",
  };
}
