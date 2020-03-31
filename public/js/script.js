$(document).ready(function() {
  $("#addemployee").click(function(e) {
    e.preventDefault();
    $("#closeAdd").click();
    $.ajax({
      url: '/add',
      type: 'post',
      dataType: 'json',
      data: $('#employeeaddform').serialize(),
      success: function(data) {
        console.log('success');
        //add list
      }
    });
  });

  $("#editemployee").click(function(e) {
    e.preventDefault();
    $("#closeEdit").click();
    $.ajax({
      url: '/edit',
      type: 'put',
      dataType: 'json',
      data: $('#employeeupdateform').serialize(),
      success: function(data) {
        console.log(data);
        //update list
      }
    });
  });

  $("#deleteemployee").click(function(e) {
    e.preventDefault();
    $("#closeDelete").click();
    $.ajax({
      url: '/delete',
      type: 'delete',
      dataType: 'json',
      data: $('#employeedeleteform').serialize(),
      success: function(data) {
        console.log('success');
        //delete list
      }
    });
  });
});
