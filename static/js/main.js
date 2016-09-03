$(document).ready(function() {



    function random_number_for_id(){
      var number =  Math.floor((Math.random() * 10000) + 1);
      return number
    }


    var line_no = 0;
    function companies_at_page_load(){
      $.ajax({
        type: "GET",
        url: "/vetted/show_company_list/",
        dataType: 'json',
        data: {"line_no" : line_no},
        success: function(data){
          $(".companies").append(
            '<div class="col-lg-5 col-lg-offset-1 company_info" id="'+ random_number_for_id() +'">'+
              '<div class="col-lg-6"><img src="'+ data[0]['logo'] +'" class="img-responsive"></div>'+
              '<a href="'+ data[0]['url'] +'" class="global_link pull-right" target="_blank"><span class="glyphicon glyphicon-globe" aria-hidden="true"></span></a>' +
              ( data[0]['site']['metaDescription'] != null ? '<div class="col-lg-12">'+ data[0]['site']['metaDescription'] +'</div>'  : " ")+
              '<div class="col-lg-12">'+
                '<span class="pull-left">Category </span> <span class="pull-right">'+ data[0]['category']['sector'] +'</span>'+
              '</div>'+
              '<div class="col-lg-12">'+
                '<span class="pull-left">Address </span><span class="pull-right">'+ data[0]['location'] +'</span>'+
              '</div>'+
              '<div class="col-lg-12">'+
                '<span class="pull-left">Since </span><span class="pull-right">'+ data[0]['foundedYear'] +'</span>'+
              '</div>'+
              '<div class="col-lg-12">'+
                '<span class="pull-left">Tags: </span><span class="tags_span pull-right">'+ data[0]['tags'] +'</span>'+
              '</div>'+
              '<div class="col-lg-12 button_div">'+
                '<a href="/vetted/knowmore/'+ data[0]['domain'] +'" id="know_more_button" class="btn btn-primary pull-left">Know More</a>'+
                ( data[1] == 'present' ? '<a href="javascript:void(0)" class="btn btn-primary pull-right" id="remove_from_list" ><span>Remove From List</span></a>' : '<a href="javascript:void(0)" class="btn btn-primary pull-right" id="add_to_list" ><span>Add To List</span></a>')+
                '<input type="hidden" id="add_to_list_value" value="'+ data[0]['domain'] +'">'+
              '</div>'+
              '<div class="col-lg-12 social_handle">'+
                ( data[0]['twitter']['site'] != null ? '<a href="'+ data[0]['twitter']['site'] +'" target="_blank" class="pull-right"><img src="../static/images/twitter.png" class="pull-right social_handle_image"></a>'  : " ")+
              '</div>'+
            '</div>'
          );
          console.log(line_no);
          line_no = line_no+1;
          console.log(data);
          if(data != 'None'){
            companies_at_page_load();
          }
        }
      });
    }

    $(function(){
      companies_at_page_load();
    });

    $("#searchform").on('submit', function(e){
      e.preventDefault();

      // removing if the div companies consists any div
      if($(".companies").has("div")){
        $(".company_info").remove();
      }

      // showing loader image
      $(".loader").css({
        "display" : "block"
      });

      input_text = $("#search_text").val();

      if(input_text == 0){
        alert("Please enter something in text box");
      }else{
        getdata();
      }
    });

    // ajax call
    function getdata(){
      $.ajax({
        type: "GET",
        url: "/vetted/search/",
        dataType: "json",
        data: {"item": $("#search_text").val()},
        success: function(data){
          $(".loader").css({
            "display" : "none"
          });
          $(".companies").append(
            '<div class="col-lg-5 col-lg-offset-1 company_info" id="company_information">'+
              '<div class="col-lg-6"><img src="'+ data[0]['logo'] +'" class="img-responsive"></div>'+
              '<a href="'+ data[0]['url'] +'" class="global_link pull-right" target="_blank"><span class="glyphicon glyphicon-globe" aria-hidden="true"></span></a>' +
              ( data[0]['site']['metaDescription'] != null ? '<div class="col-lg-12">'+ data[0]['site']['metaDescription'] +'</div>'  : " ")+
              '<div class="col-lg-12">'+
                '<span class="pull-left">Category </span> <span class="pull-right">'+ data[0]['category']['sector'] +'</span>'+
              '</div>'+
              '<div class="col-lg-12">'+
                '<span class="pull-left">Address </span><span class="pull-right">'+ data[0]['location'] +'</span>'+
              '</div>'+
              '<div class="col-lg-12">'+
                '<span class="pull-left">Since </span><span class="pull-right">'+ data[0]['foundedYear'] +'</span>'+
              '</div>'+
              '<div class="col-lg-12">'+
                '<span class="tags_span pull-right">'+ data[0]['tags'] +'</span>'+
              '</div>'+
              '<div class="col-lg-12 button_div">'+
                '<a href="/vetted/knowmore/'+ data[0]['domain'] +'" id="know_more_button" class="btn btn-primary pull-left">Know More</a>'+
                ( data[1] == 'present' ? '<a href="javascript:void(0)" class="btn btn-primary pull-right" id="remove_from_list" ><span>Remove From List</span></a>' : '<a href="javascript:void(0)" class="btn btn-primary pull-right" id="add_to_list" ><span>Add To List</span></a>')+
                '<input type="hidden" id="domain_name_for_list" value="'+ data[0]['domain'] +'">'+
              '</div>'+
              '<div class="col-lg-12 social_handle">'+
                ( data[0]['twitter']['site'] != null ? '<a href="'+ data[0]['twitter']['site'] +'" target="_blank" class="pull-right"><img src="../static/images/twitter.png" class="pull-right social_handle_image"></a>'  : " ")+
              '</div>'+
            '</div>'
          );
        }
      });
    }

    // CSRF code
    function getCookie(name) {
        var cookieValue = null;
        var i = 0;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (i; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
        crossDomain: false, // obviates need for sameOrigin test
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type)) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });


});
