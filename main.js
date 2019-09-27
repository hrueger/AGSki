const {
	Menu,
	app,
	BrowserWindow,
	globalShortcut
} = require('electron')

let mainWindow



const createWindow = () => {
	// Create the browser window.
	
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		frame: false,
		icon: __dirname + '/assets/aglogo.png',
		webperferences: {
			nodeIntegration: true,
			nodeIntegrationInWorker: true
		},
		show: true
	});

	// and load the index.html of the app.
	mainWindow.loadURL(`file://${__dirname}/index.html`);
	mainWindow.webContents.toggleDevTools();

	createMenu();
	globalShortcut.register('f5', function() {
		console.log('f5 is pressed')
		mainWindow.reload()
	})
	globalShortcut.register('CommandOrControl+R', function() {
		console.log('CommandOrControl+R is pressed')
		mainWindow.reload()
	})
	globalShortcut.register('CommandOrControl+Shift+I', function() {
		console.log('CommandOrControl++Shift+I is pressed')
		mainWindow.webContents.toggleDevTools()
	})
	
	// Emitted when the window is closed.
	mainWindow.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
	})
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
})

function createMenu() {
	const template = [
		{
			role: 'help',
			label: "Über",
			submenu: [
			  {
				label: 'Made with ❤ and Electron',
				click: async () => {
				  const { shell } = require('electron')
				  await shell.openExternal('https://electronjs.org')
				}
			  },
			  {
				label: 'Über',
				click: async () => {
					const { dialog } = require('electron');
					dialog.showMessageBox(mainWindow, {
						title: "Über den Pistenführerscheingenerator",
						message: "© 2019, Hannes Rüger"
					});
				}
			  }
			]
		  }
	  ]
	  
	  const menu = Menu.buildFromTemplate(template)
	  Menu.setApplicationMenu(menu)
}