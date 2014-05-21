//var data = [
//					{
//						name: 'Michael',
//						description: 'The Writer'
//					},
//					{
//						name: 'Ben',
//						description: 'The Other Writer'
//					},
//					{
//						name: 'Joel',
//						description: 'The CodeIgniter Writer'
//					},
//					{
//						name: 'Mark',
//						description: 'Made Up Person #1'
//					},
//					{
//						name: 'Patrick',
//						description: 'Another Made Up Person'
//					},
//					{
//						name: 'Steven',
//						description: 'That Guy'
//					}
//				];

var data=fdata;

				// Suggest section holder
				var $suggestedHL = $('.suggest-holder');
				// Suggestions UL
				var $suggestedUL = $('ul', $suggestedHL);
				// Suggestions LI
				var $suggestedLI = $('li', $suggestedHL);
				// Selected Items UL
				var $selectedUL = $('#selected-suggestions');
				// Keyboard Nav Index
				var index = -1;

				// Add a suggestion to the selected holder
				function addSuggestion(el){
					$selectedUL.append($('<li>' + el.find('.suggest-name').html() + '</li>'));
				}

				$('input', $suggestedHL).on({
					keyup: function(e){
						var m = false;
						if(e.which == 38){
							// Down arrow - Check that we've not tried to select before the first item
							if(--index < 0){
								index = 0;
							}

							// Set a variable to show that we've done some keyboard navigation
							m = true;
						}else if(e.which == 40){
							// Up arrow - Check that index is not beyond the last item
							if(++index > $suggestedLI.length - 1){
								index = $suggestedLI.length-1;
							}

							// Set a variable to show that we've done some keyboard navigation
							m = true;
						}

						// Check we've done keyboard navigation
						if(m){
							// Remove the active class
							$('li.active', $suggestedHL).removeClass('active');
							$suggestedLI.eq(index).addClass('active');
						}else if(e.which == 27){
							index = -1;
							// Esc key
							$suggestedUL.hide();
						}else if(e.which == 13){
							// Enter key
							if(index > -1){
								addSuggestion($('li.active', $suggestedHL));
								index = -1;
								$('li.active', $suggestedHL).removeClass('active');
							}
						}else{
							index = -1;
							// Clear the ul
							$suggestedUL.empty();

							// Cache the search term
							$search = $(this).val();

							// Search regular expression
							$search = new RegExp($search.replace(/[^0-9a-z_]/i), 'i');

							// Loop through the array
                                                        for(i=0;i<data.length;i=i+3){
                                                            if(data[i].match($search)){
                                                                $suggestedUL.append($("<li onClick=get_follower_status('"+data[i]+"');><img src='"+data[i+2]+"' class='left' width='50px' height='50px' /><span class='suggest-name'>" + data[i+1] + "</span><span class='suggest-description'>@"+data[i]+"</span></li>"));
                                                            }
                                                            
                                                        }
                                                        
//							for(var i in data){
//								if(data[i].name.match($search)){
//									$suggestedUL.append($("<li><img src='img/demo1.jpg' class='left' width='50px' height='50px' /><span class='suggest-name'>" + data[i].name + "</span><span class='suggest-description'>@" + data[i].description + "</span></li>"));
//								}
//							}

							// Show the ul
							$suggestedUL.show();
						}
						if($(this).val() == ''){
							$suggestedUL.hide();
						}
					},
					keydown: function(e){
						if(e.which == 38 || e.which == 40 || e.which == 13){
							e.preventDefault();
						}
					},
					focus: function(e){
						if($(this).val() != ''){
							$suggestedUL.show();
						}
					}
				});

				$suggestedHL.on('click', 'li', function(e){
					addSuggestion($(this));
				});

				$('body').on('click', function(e) {
					if (!$(e.target).closest('.suggest-holder li, .suggest-holder input').length) {
						$suggestedUL.hide();
					}
				});