Template.defaultLayout.viewmodel({
    onRendered : function(){
        $(document).ready(function(){
            setTimeout(function(){
                $('[data-toggle="tooltip"]').tooltip();
            },1000)
        })
    }
})