﻿var table = null;

$(document).ready(function () {
    //debugger;
    table = $("#department").DataTable({
        "processing": true,
        "ajax": {
            url: "/Departments/LoadDepartment",
            type: "GET",
            dataType: "json",
            dataSrc: "",
        },
        "columns": [
            { "data": "name" },
            {
                "render": function (data, type, row) {
                    //console.log(row);
                    return '<button class="btn btn-warning" data-placement="left" data-toggle="tooltip" data-animation="false" title="Edit" onclick="return GetById(' + row.id + ')" >Edit</button>'
                        + '&nbsp;'
                        + '<button class="btn btn-danger" data-placement="right" data-toggle="tooltip" data-animation="false" title="Delete" onclick="return Delete(' + row.id + ')" >Delete</button>'
                }
            }
        ]
    });
});

function ClearScreen() {
    $('#Id').val('');
    $('#Name').val('');
    $('#Update').hide();
    $('#Save').show();
}

function GetById(id) {
    $.ajax({
        url: "/Departments/GetById/",
        data: { id: id }
    }).then((result) => {
        debugger;
        $('#Id').val(result.id);
        $('#Name').val(result.name);
        $('#Save').hide();
        $('#Update').show();
        $('#mymodal').modal('show');
    })
}

function Save() {
    debugger;
    var Department = new Object();
    Department.name = $('#Name').val();
    $.ajax({
        type:'POST',
        url: "/Departments/Insert/",
        data: Department
    }).then((result) => {
        debugger;
        if (result.statusCode == 200) {
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Department inserted Successfully'
            })
        } else {
            Swal.fire('Error', 'Failed to Input', 'error');
            ClearScreen();
        }
    })
}

function Update() {
    var Department = new Object();
    Department.id = $('#Id').val();
    Department.name = $('#Name').val();
    $.ajax({
        type:'POST',
        url: "/Departments/Update/",
        data: Department
    }).then((result) => {
        debugger;
        if (result.statusCode == 200) {
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Department Updated Successfully'
            })
        } else {
            Swal.fire('Error', 'Failed to Input', 'error');
            ClearScreen();
        }
    })
}

//function Delete(id) {
//    debugger;
//    Swal.fire({
//        title: 'Are you Sure?',
//        text: 'You wont be able to revert this!',
//        showCancelButton: true,
//        confirmButtonColor: '#3085d6',
//        cancelButtonColor: 'Yes, delete it!'
//    }).then((result) => {
//        debugger;
//        if (result.statusCode == 200) {
//            $.ajax({
//                url: "/Departments/Delete/",
//                data: { id: id }
//            }).then((result) => {
//                debugger;
//                if (result.statusCode == 200) {
//                    Swal.fire({
//                        position: 'center',
//                        type: 'success',
//                        title: 'Department Updated Successfully'
//                    })
//                } else {
//                    Swal.fire('Error', 'Failed to Input', 'error');
//                    ClearScreen();
//                }
//            })
//        };
//    });
//}

function Delete(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            //debugger;
            $.ajax({
                url: "/Departments/Delete/",
                data: { id: id }
            }).then((result) => {
                debugger;
                if (result.statusCode == 200) {
                    Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: 'Delete Successfully'
                    });
                    table.ajax.reload();
                } else {
                    Swal.fire('Error', 'Failed to Delete', 'error');
                    ClearScreen();
                }
            })
        };
    });
}