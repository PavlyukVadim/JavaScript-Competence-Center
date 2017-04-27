'use strict';

var contactUsModel = {
	title: 'Contact Us',
	desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam ex molestias itaque accusantium in ad corrupti suscipit esse culpa quisquam, cumque consequuntur maxime perferendis veritatis, quasi, similique incidunt, cupiditate minus fugit natus voluptate error eius.',
	formFields: [{
		            name: 'name', 
	              size: 'col-md-6',
	              type: 'text', 
	              pattern: /^[a-zA-Z]+$/,
	              placeholder: 'Your name here',
	              tooltip: 'Only a-Z!'
	             },
							 {
							 	name: 'email',
							  size: 'col-md-6', 
							  type: 'email', 
							  pattern: /^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9._]+$/,
							  placeholder: 'Your mail here',
							  tooltip: 'Invalid mail!'
							 },
							 {
							 	name: 'message',
							  size: 'col-md-12',
							  type: 'textarea',
							  minlength: 20,
							  placeholder: 'Your mail here',
							  tooltip: 'Minimum 20 symbols!'
							}]
};
