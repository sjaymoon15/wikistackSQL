var Sequelize = require("sequelize");
var db = new Sequelize("postgres://localhost:5432/wikistack");

var Page = db.define("page", {
	title:{
		type: Sequelize.STRING, allowNull: false
	},
	urlTitle:{
		type: Sequelize.STRING, allowNull: false
	},
	content: {
		type: Sequelize.TEXT, allowNull: false
	},
	date: {
		type: Sequelize.DATE
	},
	status: {
		type: Sequelize.ENUM('open', 'closed')
	},
	// route: {
	// 	type: Sequelize.VIRTUAL,
	// 	// get: function() { return "/wiki/" + this.urlTitle; }
	// }

	}, {
	getterMethods :{
		route : function() { return "/wiki/" + this.urlTitle; }
	}
		}
);

Page.hook("beforeValidate", function(page, options){
	page.urlTitle = page.title.trim().split(" ").join("_");
});

var User = db.define("user", {
	name:{
		type: Sequelize.STRING, allowNull: false
	},
	email: {
		type: Sequelize.STRING, allowNull: false, validate: {isEmail : true}
	}
});

//?
Page.belongsTo(User);


module.exports = {
  Page: Page,
  User: User
};
