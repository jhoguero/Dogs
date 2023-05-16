import React from "react";

export default function validationDog(input) {
  const errors = {};
  if (!/[A-Za-z]{3,}/.test(input.name)) {
    errors.name = "Invalid name the dog";
  }
  if (!/^[0-9]+$/.test(input.life_span)) {
    errors.life_span = "Invalid Number";
  }
  if (!/^[0-9]+$/.test(input.heightMin)) {
    errors.heightMin = "Invalid Number";
  }
  if (!/^[0-9]+$/.test(input.heightMax)) {
    errors.heightMax = "Invalid Number";
  }
  if (!/^[0-9]+$/.test(input.weightMin)) {
    errors.weightMin = "Invalid Number";
  }
  if (!/^[0-9]+$/.test(input.weightMax)) {
    errors.weightMax = "Invalid Number";
  }
  if(!input.temperaments.length){
    errors.temperaments = "Select at least one temperament"
  }
  return errors;
}