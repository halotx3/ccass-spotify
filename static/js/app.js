function start() {
    $(document).ready(function () {
      $('.materialboxed').materialbox();
      $('.slider').slider();
      $('.tabs').tabs();
      $('.collapsible').collapsible();
      $('select').formSelect();
      $('.parallax').parallax();
      $(".a1").hide();
      $(".a2").hide();
    });
 
  };
 
  start();

  $(".main_pg").click(function () {
    $(document).ready(start);
    $(".main").show();
    // console.log("testing123")
  });

  $(".analysis_pg").click(function () {

    $(".main").hide();
    $(".a1").show();
  });

  $(".prediction_pg").click(function () {

    $(".main").hide();
    $(".a1").hide();
    $(".a2").show();
  });