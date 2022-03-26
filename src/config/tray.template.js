const MenuTemplate = (win)=>{
     return[
	 {
	    label: 'Restore',
	    click: ()=>{
	       win.show();
	    }
	 },
	 { type: 'separator' },
	 {
	    label: 'Exit',
	    click: ()=>{
	       win.close();
	    }
	 }
     ]
}

module.exports = MenuTemplate;
