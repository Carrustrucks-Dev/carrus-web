
    $(document).on('submit','#contact-form',function(event){

        $.post("http://customerprod.thebistroapp.com:1030/send_merchant_email_to_support",
                {
                    name: $('#fullname').val(),
                    email: $('#email').val(),
                    phone: $('#phn_no').val(),
                    subject: $('#subject').val(),
                    description: $('#msg').val()
                },

                function(data){
					var obj = $.parseJSON(data);
                    //console.log(obj['log']);return false;
                    $('#contact-form').trigger("reset");
                    $('#contact-form').css("display","none");
                    $('.merchant-form').html('<h1>' + obj['log'] +' </h1>');
                });
        event.preventDefault();
        return false;
    });
