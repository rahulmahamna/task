$(document).ready(function() {

  $("body").on('click', '#add_to_list', function(){
    var get_parent_to_add = $(this).parent().parent();
    $.ajax({
      type: "GET",
      url: "/vetted/add_companies_in_file/",
      dataType: "json",
      data: {"item": $(this).parent().parent().find("input").val()},
      success: function(data){
        if(data == "Added Now"){
          $(get_parent_to_add).find('#add_to_list').attr('id', 'remove_from_list');
          $(get_parent_to_add).find('a span').remove();
          $(get_parent_to_add).find('#remove_from_list').append('<span>Remove From List</span>');
        }
      }
    });
  });

  $("body").on('click', '#remove_from_list', function(){
    var get_parent_to_remove = $(this).parent().parent();
    $.ajax({
      type: "GET",
      url: "/vetted/remove_companies_from_file/",
      dataType: "json",
      data: {"item": $(this).parent().parent().find("input").val()},
      success: function(data){
        if(data == "done"){
          $(get_parent_to_remove).find('#remove_from_list').attr('id', 'add_to_list');
          $(get_parent_to_remove).find('a span').remove();
          $(get_parent_to_remove).find('#add_to_list').append('<span>Add To List</span>');
        }
      }
    });
  });
});
