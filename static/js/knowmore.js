$(document).ready(function() {
    input_text = document.URL;
    input_string = input_text.split("/");
    $(".loader").css({
      "display" : "block"
    });

    $.ajax({
      type: "GET",
      url: "/vetted/knowmoredetails/",
      dataType: "json",
      data: {"item": input_string[5]},
      success: function(data){
        $(".loader").css({
          "display" : "none"
        });
        $(".companies").append(
          '<div class="col-lg-6 col-lg-offset-3 company_info">'+
            '<div class="col-lg-6"><img src="'+ data[0]['logo'] +'" class="img-responsive"></div>'+
            '<a href="'+ data[0]['url'] +'" class="global_link pull-right"><span class="glyphicon glyphicon-globe" aria-hidden="true"></span></a>' +
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
              '<span class="pull-left">Alexa US Rank </span><span class="pull-right">'+ data[0]['metrics']['alexaUsRank'] +'</span>'+
            '</div>'+
            '<div class="col-lg-12">'+
              '<span class="pull-left">Alexa Global Rank </span><span class="pull-right">'+ data[0]['metrics']['alexaGlobalRank'] +'</span>'+
            '</div>'+
            '<div class="col-lg-12">'+
              '<span class="pull-left">Employees </span><span class="pull-right">'+ data[0]['metrics']['employees'] +'</span>'+
            '</div>'+
            '<div class="col-lg-12">'+
              '<span class="pull-left">Employees Range </span><span class="pull-right">'+ data[0]['metrics']['employeesRange'] +'</span>'+
            '</div>'+
            '<div class="col-lg-12">'+
              '<span class="pull-left">Raised </span><span class="pull-right">'+ data[0]['metrics']['raised'] +'</span>'+
            '</div>'+
            ( data[0]['tech'] != null ? '<div class="col-lg-12"><span class="pull-left">Techn</span><span class="pull-right">'+ data[0]['tech'] +'</span> </div>'  : " ")+
            ( data[0]['metrics']['annualRevenue'] != null ? '<div class="col-lg-12"><span class="pull-left">Annual Revenue</span><span class="pull-right">'+ data[0]['metrics']['annualRevenue'] +'</span> </div>'  : " ")+
            ( data[0]['emailProvider'] != null ? '<div class="col-lg-12"><span class="pull-left">Email Provider</span><span class="pull-right">'+ data[0]['emailProvider'] +'</span> </div>'  : " ")+
            ( data[0]['type'] != null ? '<div class="col-lg-12"><span class="pull-left">Type</span><span class="pull-right">'+ data[0]['type'] +'</span> </div>'  : " ")+
            ( data[0]['phone'] != null ? '<div class="col-lg-12"><span class="pull-left">Phone</span><span class="pull-right">'+ data[0]['phone'] +'</span> </div>'  : " ")+



            '<div class="col-lg-12">'+
              '<span class="pull-left">Tags: </span><span class="tags_span pull-right">'+ data[0]['tags'] +'</span>'+
            '</div>'+
            '<div class="col-lg-12 button_div">'+
              ( data[1] == 'present' ? '<a href="javascript:void(0)" class="btn btn-primary pull-right" id="remove_from_list" ><span>Remove From List</span></a>' : '<a href="javascript:void(0)" class="btn btn-primary pull-right" id="add_to_list" ><span>Add To List</span></a>')+
              '<input type="hidden" id="add_to_list_value" value="'+ data[0]['domain'] +'">'+
            '</div>'+
            ( data[0]['twitter']['site'] != null ? '<div class="col-lg-12"><a href="'+ data[0]['twitter']['site'] +'" target="_blank" class="pull-right"><img src="../../static/images/twitter.png" class="pull-right social_handle_image"></a> </div>'  : " ")+
          '</div>'
        );
      }
    });

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
