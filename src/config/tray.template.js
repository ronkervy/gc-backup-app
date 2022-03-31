const { app } = require('electron');

const MenuTemplate = (win)=>{
      return[
	 {
	    label: 'Restore',
	    click: ()=>{
	       w.show();
	    }
	 },
	 { type: 'separator' },
	 {
	    label: 'Exit',
	    click: ()=>{
	       app.quit();
	    }
	 }
     ]
}

module.exports = MenuTemplate;
