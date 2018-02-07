$(document).ready(function(){

  $(document).scrollTop(0);

  // Globals ------------------

  const colors = [
    [55, 64, 250],
    [255, 240, 0],
    [195, 49, 221],
    [54, 244, 67],
    [230, 35, 35],
    [16, 136, 237],
    [179, 41, 151],
    [230, 182, 35]
  ];
  let leftRGB, rightRGB, leftDiff, rightDiff;
  let counter = 0;

  // Functions ------------------

  function setColors(left, right) {
    let RGBString = $("#logo")
      .css("background-image")
      .split(",");

    leftRGB = [
      Number(RGBString[1].slice(RGBString[1].indexOf("(") + 1)),
      Number(RGBString[2].slice(RGBString[2].indexOf(" ") + 1)),
      Number(
        RGBString[3].slice(
          RGBString[3].indexOf(" ") + 1,
          RGBString[3].length - 1
        )
      )
    ];

    rightRGB = [
      Number(RGBString[4].slice(RGBString[4].indexOf("(") + 1)),
      Number(RGBString[5].slice(RGBString[5].indexOf(" ") + 1)),
      Number(
        RGBString[6].slice(
          RGBString[6].indexOf(" ") + 1,
          RGBString[6].length - 2
        )
      )
    ];

    leftDiff = [
      (leftRGB[0] - left[0]) / 300,
      (leftRGB[1] - left[1]) / 300,
      (leftRGB[2] - left[2]) / 300
    ];
    rightDiff = [
      (rightRGB[0] - right[0]) / 300,
      (rightRGB[1] - right[1]) / 300,
      (rightRGB[2] - right[2]) / 300
    ];

    return {
      leftRGB: leftRGB,
      rightRGB: rightRGB,
      leftDiff: leftDiff,
      rightDiff: rightDiff
    };
  } // end of setColors()

  let timer = setInterval(function() {
    if (counter === 0) {
      setColors(colors[0], colors[1]);
    } else if (counter === 3000) {
      setColors(colors[2], colors[3]);
    } else if (counter === 6000) {
      setColors(colors[4], colors[5]);
    } else if (counter === 9000) {
      setColors(colors[6], colors[7]);
    } else if (counter === 12000) {
      counter = 0;
    }

    counter += 10;
    leftRGB[0] -= leftDiff[0];
    leftRGB[1] -= leftDiff[1];
    leftRGB[2] -= leftDiff[2];
    rightRGB[0] -= rightDiff[0];
    rightRGB[1] -= rightDiff[1];
    rightRGB[2] -= rightDiff[2];

    let string = `linear-gradient(45deg, rgb(${Math.round(
      leftRGB[0]
    )}, ${Math.round(leftRGB[1])}, ${Math.round(leftRGB[2])}), rgb(${Math.round(
      rightRGB[0]
    )}, ${Math.round(rightRGB[1])}, ${Math.round(rightRGB[2])}))`;

    $("#logo").css("background", string);
    $("hr").css("background", string);
    $("nav>div>p").css({
      "border-top": "2px solid",
      "border-image": `${string} 1`
    });
    $(".button").css({
      "border-top": "2px solid",
      "border-image": `${string} 1`
    });
    $("nav>div").css("background-image", string);
    $(".button").css("background-image", string);
    $("#work").css({
      "border-top": "10px solid",
      "border-bottom": "10px solid",
      "border-image": `${string} 1`
    });
    $("#workTitle>h3").css({
      "border-bottom": "6px solid",
      "border-image": `${string} 1`
    });
    $("#about").css({
      "border-bottom": "10px solid",
      "border-image": `${string} 1`
    });

    $("#about>div>h3").css({
      "border-bottom": "6px solid",
      "border-image": `${string} 1`
    });

    $("#about>div>img").css({
      "border": "10px solid",
      "border-image": `${string} 1`
    });
    $("#skills>div:nth-child(1)").css({"border-right": "6px solid", "border-image": `${string} 1`});
  }, 10);

    // jQuery Triggers ------------------

    $("body").click(function(){
      $("body").css({ "cursor": "default", "overflow": "visible" });
      $("#logo").css("animation", "logoAnim 1.5s forwards ease");
      $("#home>div:nth-child(1)").css("animation", "slidefade 1s 1s forwards ease");
      $("#home>div>hr").css("animation", "hrAnim 1s 1.25s forwards ease");
      $("nav>div").css("animation", "slidefade 1s 1.5s forwards ease");
      setTimeout(function(){
        $("#arrow").css("animation", "arrow-anim 2s ease infinite");
      }, 3500);
    });

    $(window).scroll(function(){
      $("#arrow").fadeOut(500).css("animation", "none");
    });

}); // end of document.ready()
