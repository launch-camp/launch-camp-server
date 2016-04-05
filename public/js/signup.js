var selectedSession;
var selectedSessionNumber;

$(function() {
	$(".session-choice").click(function(e) {
		$(".session-choice").removeClass("focus");
		var clickedSession = $(e.target);
		clickedSession.addClass("focus");
		selectedSession = clickedSession.html();
		selectedSessionNumber = clickedSession.data("number")
		$(".no-session").hide();
	})

	$(".submit-application").click(function() {			
		// first validate all the inputs

		console.log("validating!");
		
		if (!selectedSession) {
			$(".no-session").show();
		} else if (!$(".application-form").valid()) {
			$(".info-error").show();
		} else {
			var price;

			var couponCode = $("#coupon-code").val()
			if (couponCode && couponCode.toLowerCase() !== "cubb") {
				$(".coupon-error").show();	
				return 				
			}

			$("#session-number").val(selectedSessionNumber);
			
			$(".application-form").submit();
		}	
	})

	$(".email-submit").click(function(e) {
		var email = $(".email-input").val();
		if (email) {
			$.ajax({				
				type: "post",
				url: "//formspree.io/info@thelaunchcamp.com",
				data: {
					email_address: email
				},
				"dataType": "text",
				complete: function(resp) {					
					$(".email-entry-header").html("Thanks! We'll be in touch soon.");
					$(".email-input").attr("disabled", true);
					$(".email-submit").attr("disabled", true);
				}
			})
		}
	})
})


