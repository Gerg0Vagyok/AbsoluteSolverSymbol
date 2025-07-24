let Commands = [

]

const Colors = ["#ff0000", "#ffff00", "#8000ff", "#ffffff", "#000000"];
const ColorNames = ["Red", "Yellow", "Purple", "White", "Black"];
const Names = ["Translate/AbsoluteSolverV1", "Translate/AbsoluteSolverV2", "Edit/AbsoluteSolverV1", "Scale/AbsoluteSolverV1", "Rotation/AbsoluteSolverV1"];

for (let o = 0; o < Colors.length; o++) {
  for (let i = 0; i < Colors.length; i++) {
    for (let j = 0; j < Names.length; j++) {
      const OriginalName =    ""+Names[j]+".html";
      const OriginalText =    "\\/\\/REFERENCE THIS IN REGEX TO EDIT THE COLORS";
      //const ReplacementText = "MainGroup.setAttribute(\\\"fill\\\", FillColor);\\nMainGroup.setAttribute(\\\"stroke\\\", StrokeColor);\\n    for (i = 0; i < Glows.length; i++) {\\n        Glows[i].setAttribute(\\\"flood-color\\\", GlowColor)\\n    }";
      const ReplacementText = "MainGroup.setAttribute(\\\"fill\\\", " + Colors[i] + ");\\nMainGroup.setAttribute(\\\"stroke\\\", " + Colors[i] + ");\\n    for (i = 0; i < Glows.length; i++) {\\n        Glows[i].setAttribute(\\\"flood-color\\\", " + Colors[o] + ")\\n    }";
      Commands.push("echo " + Commands.length/3 + " && cp " + OriginalName + " " + Names[j] + ColorNames[i] + "Fill" + ColorNames[o] + "Glow.html")
      Commands.push("sed -i \"s|" + OriginalText + "|" + ReplacementText + "|g\" " + Names[j] + ColorNames[i] + "Fill" + ColorNames[o] + "Glow.html");
      Commands.push("python ../svgtopng.py " + Names[j] + ColorNames[i] + "Fill" + ColorNames[o] + "Glow.html Colored/" + Names[j] + ColorNames[i] + "Fill" + ColorNames[o] + "Glow.png --width 1024 --height 1024 --verbose");
    }
  }
}

await Deno.writeTextFile("output.sh", Commands.join("\n"));
console.log("Wrote file with " + Commands.length + "lines!");
