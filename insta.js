const puppeteer = require("puppeteer");


//username box for the instgram bot

//document.documentElement.children[1].children[0].children[0].children[1].children[0].children[1].children[0].children[1].children[0].children[1].children[0].children[0].children[1].value 

var username = process.argv[2];
var password = process.argv[3];
var mode = process.argv[4]
var user = process.argv[5]
console.log(process.argv)



//modes
async function Follow_Users(browser,page, user){
	await page.click(".eyXLr")
	await page.click(".x3qfX")
	await page.type("[placeholder='Search']", user)
	setTimeout(async function() {
		try {
			console.log("Searching user")
			await page.click(".yCE8d")
			console.log("User Found")
		}
		catch {
			console.log("User Not found")	
		}
		setTimeout(async function() {
		await page.click("a.-nal3")
			setTimeout(async function() {
				var names = await page.$$eval("._0imsa", name => name.map(name => name.textContent))
				var followers = await page.$$(".y3zKF")
				for(let i = 0; i <= followers.length; i++){
					try {
						await followers[i].click()
					}
					catch(err) {
						console.log(err)
					}
					console.log(followers[i])
				}
				await page.click("button.wpO6b")
				console.log(followers)
				console.log(names)
				await page.screenshot({path: "example.png"})
				setTimeout(async function() {
					names.pop()
					names.forEach(async function(name) {
						let pag = await browser.newPage()
						await pag.goto(`https://www.instagram.com/${name}/`)
						setTimeout(async function(){
							await pag.click("button._5f5mN")
							await pag.click(".aOOlW")
							await pag.screenshot({path: `${name}.png`})
							console.log("Done...")
						}, 4000)
					})
				}, 5000)
				console.log("Ctrl-C to close the page ones you see Done...")
			}, 3000)
		}, 4000)
	}, 9000)
}


//logging in stuff
if(username === undefined || password === undefined || mode === undefined){
	if(username === undefined || password === undefined){
		console.log("Please put a user name and password")
	}else if(mode === undefined){
		console.log("Please specify a mode")
	}
}else {
	console.log("Logging in as " + username);
	(async function(){
		var browser = await puppeteer.launch()
		var page = await browser.newPage()
		await page.goto("https://www.instagram.com/")

		setTimeout(async () => {
			await page.type("[name='username']",  username)
			await page.keyboard.down('Tab')
			await page.keyboard.type(password)
			await page.keyboard.down("Enter")
			await page.click(".y3zKF")
			setTimeout(async function(){
				await page.screenshot({path: "example.png"})
				console.log(username)
				console.log("Logged in as " + username)
				if(mode === "Follow_Users"){
					Follow_Users(browser,page, "apple")
				}
			}, 5000)	
		}, 9000)
	})();
}
if(mode){
	console.log("Mode is " + mode)
}