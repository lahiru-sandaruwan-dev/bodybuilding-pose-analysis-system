import { Component } from "@angular/core";

@Component({
  selector: "app-show-recommendations",
  templateUrl: "./show-recommendations.component.html",
  styleUrls: ["./show-recommendations.component.scss"],
})
export class ShowRecommendationsComponent {
  ngOnInit(): void {
    this.playVideos();
  }

  playVideos() {
    // globals
    var activeCon: number = 0,
      totalCons: number = 0;

    $(document).ready(function () {
      // activate container
      function activate(con: JQuery<HTMLElement>) {
        deactivateAll();
        indexAll();
        countVideos($(con).find(".index").html());
        $(con).addClass("active-con");
        $(con).find(".index").html("►");
      }

      // deactivate all container
      function deactivateAll() {
        $(".video-con").removeClass("active-con");
      }

      // index containers
      // function indexAll() {
      //   $(".video-con").each(function (index: number) {
      //     $((this)).find(".index").html(index + 1);
      //   });
      // }
      function indexAll() {
        $(".video-con").each(function (this: HTMLElement, index: number) {
          $(this)
            .find(".index")
            .html(`${index + 1}`);
        });
      }

      // update video count
      function countVideos(active: string) {
        $("#video-count").html(active + " / " + $(".video-con").length);
      }

      // icon activate
      function toggle_icon(btn: JQuery<HTMLElement>) {
        $(btn).toggleClass("icon-active");
      }

      // toggle video list
      function toggle_list() {
        $("#drop-icon").toggleClass("rotate-180");
        $("#v-list").toggleClass("li-collapsed");
      }

      function loadVideo(url: string) {
        $("#display-frame").attr("src", url);
      }

      // starting calls
      indexAll(); // container indexes
      countVideos("1");
      activate($(".video-con").eq(0));
      loadVideo($(".video-con").eq(0).attr("video"));

      // Event handling
      // on each video container click
      $(".video-con").on("click", function (this: HTMLElement) {
        activate($(this));
        loadVideo($(this).attr("video"));
      });

      // on each button click
      $("#lower-info div").on("click", function (this: HTMLElement) {
        toggle_icon($(this));
      });

      // drop icon click
      $("#drop-icon").on("click", function (this: HTMLElement) {
        toggle_list();
      });
    });
  }
}
