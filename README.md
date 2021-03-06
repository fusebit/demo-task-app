<p align="center"> 
  <img src="https://cdn.fusebit.io/assets/logo/v2/logo-mark.png" alt="Fusebit Logo Logo" width="80px" height="80px">
</p>
<h1 align="center"> Fusebit Sample App </h1>

## How do I integrate Fusebit into my SaaS app?

</br>

We built this sample app to **help you answer** this question.

Please explore this codebase to understand how the different pieces work under the hood. Additionally, you can also use this as a companion app while you build out your integration in Fusebit before you migrate it fully into your own product.

## 💻 Installation

1. Create a .env file from the [example file](https://github.com/fusebit/demo-task-app/blob/main/.env.example)
2. Run `npm run-script build`
3. Run `node .`

## 🎨 Customization

If you wanted to use this sample app to do a quick demo, then we offer limited customization capabilities to help with this. You are able to change the color theme and upload your own custom logo as well. 

### Color Theme

The default primary color is #333333, and the default secondary color is #3F51B5. The primary color will be reflected almost everywhere on the sample app, unless that color is set to #ffffff.

* To change the primary color of the sample app, use the `primary` query param followed by a hex color without the #, for example: https://task-sample-app.on.fusebit.io/?primary=333333

* To change the secondary color of the sample app, use the `secondary` query param followed by a hex color without the #, for example: https://task-sample-app.on.fusebit.io/?secondary=3F51B5

* If you want to change both of them at the same time, you can do it like so: https://task-sample-app.on.fusebit.io/?primary=333333&secondary=3F51B5

In case the primary color is #ffffff (white), we will use the secondary color on the buttons, the marketplace tiles and on the login page instead of the primary color to prevent the primary color to intervene with the sample app background color. If the primary color is different to white, the secondary color will only be used to change the secondary user avatar color and as a detail color on some hover or focus states.

### Logo

To change the logo, drag and drop your logo on the box that says `Drag your logo here` or click on the box and select the logo you desire to set.

If you want to change the logo again after you have set it, either drag and drop your new logo on the old logo and you'll see that the logo will dissapear and the drop box that says `Drag your logo here` will render again, or click on the logo and a prompt to select a new logo will show up.

We recommend using [this extension](https://chrome.google.com/webstore/detail/svg-export/naeaaedieihlkmdajjefioajbbdbdjgp/related) to download the SVG's icon's from the websites you wish to make the sample app look like

To use this extension, simply download it, and click on the extension icon when you are in the webiste you want to get the SVG from. A new window will pop showing you all of the SVG's of the website, and you'll be able to download the ones you want to use.

### Resetting Customization

All of the customization preferences will be saved in localstorage.

* The colors will be saved under the `colors` key. If you want to set the colors back to the default value, right click on the `colors` key and then click on `delete`.

* The logo will be saved under the `logo` key. If you want to remove the logo, right click on the `logo` key and then click on `delete`.

The helpers will be disabled by default if the colors are customized. You will see them under the `disableHelpers` key if they are disabled. You don't need to remove this key, if you remove the colors preference, the `disableHelpers` key will be automatically removed and the helpers will be visible again.

The `configuration` key is a JWT we use to get your account information, for example your user ID, account ID, and subscription ID. Do not remove this key.

The `users` key is an object that contains the users data. We mostly use this key to store the custom user names, so if you delete this key and then log out, you'll see that the user names will roll back to `Tenant 1` and `Tenant 2`.

## Questions?

Reach out to us on Slack: <a target="_blank" href="https://fusebitio.slack.com">![alt text](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white 'Slack logo')</a>
