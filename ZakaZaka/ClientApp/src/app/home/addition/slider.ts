import {Component, OnInit, AfterContentInit} from "@angular/core";

@Component({
  selector: "slider",
  templateUrl: "slider.html",
  styleUrls: ["slider.css"],
})

export class Slider implements OnInit, AfterContentInit{
  slideCount: number;
  listOfElement: HTMLCollection;
  slideNow: number = 1;

  constructor() {}

  ngOnInit() {

  }
  ngAfterContentInit(){
    this.listOfElement = document.getElementsByClassName("content-slider__slide");
    this.slideCount = this.listOfElement.length;
    this.slideNow = 3;
    this.setActiveNavButton();
    this.numberSlideLoading();
  }

  public nextSlide() {
    if (this.slideNow === this.slideCount || this.slideNow === 0 || this.slideNow > this.slideCount) {
      this.slideNow = 1;

      this.setStyle(0, 0);
      this.setActiveNavButton();
      return;
    }

    this.setStyle(this.slideNow, 0);

    this.slideNow++;

    this.setActiveNavButton();
  }

  public previousSlide() {
    if (this.slideNow === 1 || this.slideNow <= 0 || this.slideNow > this.slideCount) {
      this.slideNow = this.slideCount;

      this.setStyle(this.slideCount, 1);
      this.setActiveNavButton();
      return;
    }

    this.setStyle(this.slideNow, 2);

    this.slideNow--;

    this.setActiveNavButton();
  }

  public slideNavButton(idNav: number) {
    this.slideNow = idNav;

    this.setStyle(this.slideNow, 1);
    this.setActiveNavButton();
  }

  private setActiveNavButton() {
    let navButtons = document.getElementsByClassName("content-slider__dot-button");

    for (let i = 0; i < navButtons.length; i++)
      navButtons[i].classList.remove("dot-button__active");

    navButtons[this.slideNow - 1].classList.add("dot-button__active");
  }

  private setStyle(sliderShootFrom: number, sliderShootTo: number, additionalAttribute: string = "") {

    let widthSlider = document.getElementById("main-slider").offsetWidth * (sliderShootFrom - sliderShootTo);
    for (let i = 0; i < this.listOfElement.length; i++)
      this.listOfElement[i].setAttribute("style", "transform: translate(-" + widthSlider + "px, 0);" + additionalAttribute);
  }

  private numberSlideLoading() {
    this.setStyle(this.slideNow, 1, "transition-duration: 0s;");
  }
}

