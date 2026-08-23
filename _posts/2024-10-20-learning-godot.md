---
layout: post
title: "Learning Godot"
date: 2024-10-20
description: "Learning Godot through Crayon Blaster, a hand-drawn space shooter and a small step back into personal game development."
image: /assets/posts/2024-10-20/crayon_blaster.png
categories:
  - Blog
tags:
  - game dev
  - update
---

## Sparse Updates

So, I realize I haven't updated this site in nearly a year now. And this was supposed to replace my old site. Seems I've been neglecting my online presence. At any rate, I am going to be making an effort to make these sort of "blog" posts more often. Primarily as a way of documenting my own progress for myself. But if you are reading this and find it interesting, well, that's a bonus.

For a few years now I've felt very burnt out on game development, and really just any personal projects at all. I've been working on a few things here and there, but nothing has really stuck. In an effort to revitalize my love of game dev (which drove me to learn programming in the first place), I've decided to start learning the Godot game engine.

## Godot

My initial impressions are good. I have stubbornly disliked drag-and-drop editors for some time, preferring all-code engines like Phaser (Though even Phaser has an editor now, not sure how many people actually use it though). But Godot seems powerful and the editor is non-intrusive when I'm not making use of its tools. I've followed a tutorial initially to get a feel for the engine. The project was creating a space shooter game (again, I've done so many "test" projects like this for other engines/tools). I finished it and then fleshed out some features as my "homework" for myself. I created a secondary weapon in the form of a piercing laser. I changed the control scheme to something that is probably more frustrating than functional, but it is unique and helped me practice. I added some new animations. I created a title menu and control explanations.

I also tried to make as many of the game assets myself as I can. I am not an artist, but I think I should try from time to time. The art was all made in Windows Paint using the crayon brush. I created most of the sound effects myself, except for the music. I have no real capacity to create music so I used a really cool track from the Nine Inch Nails "Ghosts" album. I think it fits the game well. I also didn't want to go through the efforts of making a font, so I found a free to use "crayon" font online (matches my art assets well).

There is one other thing that wasn't me. A plugin to display different icons based on controller/keyboard input. I had an idea to do this myself, but I actually wanted to learn how to use plugins in Godot. So this seemed like a great time saver and an opportunity to do so. It is a very cool plugin and now the control prompts will show the correct icons based on the input device. I did start to create new icons for the plugin to match the crayon art style, but I'm not sure I'm going to finish this. As a proof of concept, the space bar and PS5 Cross button are replace with crayon art. I am not convinced it would be worth the tedious effort to do the rest.

The game is called "Crayon Blaster" and I am going to make a few more changes to it before publishing. It certainly isn't going to be anything fantastic, but hopefully it will feel playable enough to be a few minutes entertainment for anyone who tries it. Once published, I don't think I'm going to revisit Crayon Blaster. While there are a million things I can think of it make it more fun, I didn't set out to make a space shooter game and I need to choose an endpoint for this project.

## Up Next

My current list of features to add before publishing are:
- progressive difficulty, right now meteors just spawn at a constant rate
- ui to indicate if your secondary laser weapon is ready to fire
- meteors spawning from different directions as the game progresses
- some sort of intelligent enemies? (simple state machines if I decide to do this)
  - this is probably out of scope, but I might not be able to resist giving it a shot
  - these would serve as the "boss" in a game of mostly inanimate objects

After this I have two major game ideas. One is an RPG, the other is a pretty unique type of game that I would rather get some progress on before discussing. It involves Shakespeare. Hope to be giving updates soon.

(An aside: I plan to take all of the "project page" listings from my old site and turn them into Blog posts on here, since I like this format better. I will be tagging these as "retroactive" and they will be backdated, though not necessarily accurately. This Blog site will also serve as my portfolio once that is complete, and I'll redirect jeremyglebe.com to here.)

## [Crayon Blaster](https://github.com/jeremyglebe/CrayonBlaster)
Click above, or the image below, to view the project repository on GitHub.

[![Crayon Blaster](/assets/posts/2024-10-20/crayon_blaster.png)](https://github.com/jeremyglebe/CrayonBlaster)
