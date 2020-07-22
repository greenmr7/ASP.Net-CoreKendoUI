$(document).ready(function () {
    $(function () {
        //$('[data-toggle="tooltip"]').tooltip()
    });

    var BaseUrl = "/Departments",
        dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: BaseUrl + "/LoadDepartment",
                    dataType: "json"
                },
                //create: {
                //    url: BaseUrl + "/Insert",
                //    dataType: "json"
                //},
                //update: {
                //    url: BaseUrl + "/Products/Update",
                //    dataType: "jsonp"
                //},
                //destroy: {
                //    url: BaseUrl + "/Products/Destroy",
                //    dataType: "jsonp"
                //},
                parameterMap: function (options, operation) {
                    if (operation !== "read" && options.models) {
                        return { models: kendo.stringify(options.models) };
                    }
                }
            },
            batch: true,
            pageSize: 15,
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { editable: false, nullable: true },
                        name: { validation: { required: true } },
                    }
                }
            }
        });

    

    //debugger;
    $("#grid").kendoGrid({
        dataSource: dataSource,
        groupable: true,
        sortable: true,
        navigatable: true,
        filterable: true,
        //selectable: "column",
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        height: 650,
        toolbar: [{ name: "create", text: " ", title: "Add Data", imageClass: "k-grid-add" }],
        columns: [
            { title: "#", field: "id", },
            { title: "Name", field: "name", },
            {
                sortable: false,
                title: "Action",
                command: [
                    { name: "edit", text: { edit: " ", update: " ", cancel: " " }, title: "Edit Data", imageClass: "k-grid-edit",},
                    { name: "destroy", text: "", title: "Delete Data", imageClass: "k-grid-delete" },
                ],
            },
        ],
        editable: {
            mode: "popup",
            //mode: "inline",
            confirmation: false,
        },
        save: function (e) {
            //debugger;
            console.log(e);
            if (!e.model.isNew()) {
                debugger;
                var Department = new Object();
                Department.id = e.model.id;
                Department.name = $('input[name="name"]').val();
                $.ajax({
                    type:'POST',
                    url: "/Departments/Update/",
                    cache: false,
                    dataType: "JSON",
                    data: Department
                }).then((result) => {
                    //debugger;
                    if (result.statusCode == 200) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Department Updated Successfully',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        $('#grid').data('kendoGrid').dataSource.read();
                        $('#grid').data('kendoGrid').refresh();
                    } else {
                        Swal.fire('Error', 'Failed to Input', 'error');
                    }
                })
            } else {
                //debugger;
                var Department = new Object();
                Department.name = $('input[name="name"]').val();
                $.ajax({
                    type:'POST',
                    url: "/Departments/Insert/",
                    cache: false,
                    dataType: "JSON",
                    data: Department
                }).then((result) => {
                    //debugger;
                    if (result.statusCode == 200) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Department inserted Successfully',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        $('#grid').data('kendoGrid').dataSource.read();
                        $('#grid').data('kendoGrid').refresh();
                    } else {
                        Swal.fire('Error', 'Failed to Input', 'error');
                    }
                })
            }
        },
        remove: function (e) {
            //debugger;
            //console.log("Debugger Hits :)");
            console.log(e.model.id);
            Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            }).then((result) => {
                if (result.value) {
                    //debugger;
                    $.ajax({
                        url: "/Departments/Delete/",
                        data: { id: e.model.id }
                    }).then((result) => {
                        //debugger;
                        if (result.statusCode == 200) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Delete Successfully',
                                showConfirmButton: false,
                                timer: 1500,
                            });
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();
                        } else {
                            Swal.fire('Error', 'Failed to Delete', 'error');
                        }
                    })
                };
            });
        },
    }).data("kendoGrid");

    $('#grid').kendoTooltip({
        filter: "a.k-button", // if we filter as td it shows text present in each td of the table

        content: function (e) {
            //console.log(e);
            var grid2 = $("#grid").data("kendoGrid");
            var retStr;
            //debugger;
            if (grid2.columns[2].command) {
                $.each(grid2.columns[2].command, function (index, value) {
                    //console.log(grid2.columns[2].command);
                    if (e.target.hasClass(value.imageClass)) {
                        //console.log(e.target.hasClass(value.imageClass));
                        retStr = value.title;
                        //console.log(retStr);
                        return false
                    }
                });
            } 
            return retStr

        }, //kendo.template($("#template").html()),
        width: 160,
        height: 20,

        position: "top"
    }).data("kendoTooltip");
        
});
