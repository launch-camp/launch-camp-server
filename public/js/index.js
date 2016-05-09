$(function(){
	if (!window.matchMedia("(max-device-width: 768px)").matches) {
		var olinDtechConnector = jsPlumb.getInstance();
		olinDtechConnector.setContainer($(".explanation-section"));

		var dtechLaunchCampConnector = jsPlumb.getInstance();
		dtechLaunchCampConnector.setContainer($(".explanation-section"));

		olinDtechConnector.importDefaults({
			Connector:[ "Flowchart"],
			Anchors : [ "Bottom", "Top" ],
			Endpoint: "Blank",
			EndpointStyle : { fillStyle: "#567567"  },
			PaintStyle: { strokeStyle: "#FF9185", lineWidth: 5 }
			// Anchor : [ 0.5, 0.5, 1, 1 ]
		});

		dtechLaunchCampConnector.importDefaults({
			Connector:[ "Flowchart"],
			Anchors : [ "Bottom", "Top" ],
			Endpoint: "Blank",
			EndpointStyle : { fillStyle: "#567567"  },
			PaintStyle: { strokeStyle: "#FF9185", lineWidth: 5 }
			// Anchor : [ 0.5, 0.5, 1, 1 ]
		});	

		olinDtechConnector.connect({
			source:"olin-logo-container",
			target:"dtech-logo-container"
		});	

		dtechLaunchCampConnector.connect({
			source:"dtech-logo-container",
			target:"launch-camp-logo-container"
		});				
	}

	$(".email-submit").click(function(e) {
		var email = $(".email-input").val();
		if (email) {
			submitFormSpree({ email_address: email}, function() {				
				$(".newsletter-thankyou").show()
				$(".email-input").attr("disabled", true);
				$(".email-submit").attr("disabled", true);				
			})

			fbq && fbq('track', 'Lead');
		}
	})	

	$(".email-submit").click(function(e) {
		var email = $(".email-input").val();
		if (email) {
			submitFormSpree({ email_address: email}, function() {				
				$(".newsletter-thankyou").show()
				$(".email-input").attr("disabled", true);
				$(".email-submit").attr("disabled", true);				
			})

			fbq && fbq('track', 'Lead');
		}
	})

	var submitInfoSession = $(".info-session-submit");
	var infoSessionInput = $(".info-session-email-input");
	var infoSuccess = $(".info-session-success")
	submitInfoSession.click(function() {		
		var email = infoSessionInput.val();

		if (email) {
			submitInfoSession.html("Submitting...").removeClass("btn-primary").addClass("btn-warning")

			$.ajax({
				url: "https://script.google.com/macros/s/AKfycbwsyTAgdJ49o48qLj5WCmwfhXbv_bsXarR4lvQ4WnMlXDIzIitl/exec",
				method: "POST",
				data: $(".info-session-signup").serialize(),
				success: function() {
					$(".last-info-session-text").removeClass("last-info-session-text");

					submitInfoSession.html("Success!").removeClass("btn-warning").addClass("btn-success")
					submitInfoSession.attr("disabled", true);
					infoSessionInput.attr("disabled", true);
					infoSuccess.show();
					infoSuccess.addClass("last-info-session-text");
					
					if (olinDtechConnector && dtechLaunchCampConnector) {						
						olinDtechConnector.repaintEverything();
						dtechLaunchCampConnector.repaintEverything();
					}
				}
			})
		}		

		return false
	})
})