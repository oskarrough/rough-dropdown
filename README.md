# Rough: Dropdown
This component provides two things:

1. Low-level CSS for dropdowns
2. Script to change dropdowns from hover to click

The CSS is divided into necessary and "makeup" styles so you can delete what you don't need.

## Installation
* [Bower](http://bower.io/): `bower install --save rough-dropdown`
* Download: [zip](https://github.com/oskarrough/rough-dropdown/zipball/master)
* Git: `git clone https://github.com/oskarrough/rough-dropdown.git`

## Get started
1. Reference jQuery and `<script src="rough-dropdown.js"></script>`
2. Reference `<link rel="stylesheet" href="rough-dropdown.css">`
3. You will need a container with the classes: `Nav` and `Nav--dropdown`
4. Call the plugin using using ```$('.Nav--dropdown').roughDropdown()