import { Component } from "@angular/core";

@Component({
  selector: "app-pose-details",
  templateUrl: "./pose-details.component.html",
  styleUrls: ["./pose-details.component.scss"],
})
export class PoseDetailsComponent {
  poses = [
    {
      id: 1,
      name: "Front Double Biceps",
      description:
        "The Front Double Biceps pose is one of the most iconic and essential poses in bodybuilding competitions.",
      steps: [
        "Stand shoulder-width apart for stability.",
        "Raise both arms horizontally to shoulder level, then flex the biceps with elbows bent at about 90°.",
        "Slightly turn your wrists inward to highlight biceps peak.",
        "Keep the chest high and flare your lats by slightly expanding your back.",
        "Engage your core and flex your abs for complete torso visibility.",
        "Flex quadriceps and calves subtly to add balance to the overall pose.",
      ],
      angles: {
        elbow: "85° to 95°",
        wristRotation: "15°–25° inward for peak visibility",
        latFlare: "45° outward from spine for a wide look",
      },
      commonMistakes: [
        "Elbows too high or low, breaking the symmetry.",
        "Wrists not rotated, resulting in less biceps peak definition.",
        "Failing to engage lats, making the pose look flat.",
        "Poor posture and forward-leaning chest.",
        "Uneven flexing between arms and legs.",
      ],
      aiTips: [
        "Ensure elbow angles stay within the correct range (85–95°).",
        "Highlight wrist rotation degree for better peak assessment.",
        "Measure shoulder symmetry between left and right side.",
        "Detect lat expansion ratio to identify flaring efficiency.",
        "Provide real-time posture alignment alerts.",
      ],
    },
    {
      id: 2,
      name: "Side Chest",
      description:
        "The Side Chest pose highlights chest muscles and provides a detailed view of upper body strength.",
      steps: [
        "Stand with one foot slightly forward for a solid base.",
        "Bring both arms into a flex position, with the chest lifted and lats expanded.",
        "Ensure the elbow of the flexed arm points directly out to the side.",
        "Rotate the wrist slightly inward to emphasize the chest.",
        "Keep the chest high and avoid excessive leaning forward or backward.",
        "Contract your core and flex your legs for overall symmetry.",
      ],
      angles: {
        elbow: "Slightly bent at 85°–90° for optimal chest display",
        chestLift:
          "Lift your chest at a 30°–45° angle for full muscle contraction",
      },
      commonMistakes: [
        "Leaning too much forward or backward, losing balance.",
        "Not rotating the wrist inward enough to fully flex the chest.",
        "Poor foot positioning that reduces stability.",
        "Elbow not pointing outward, reducing chest prominence.",
        "Neglecting to engage the core, which makes the pose less defined.",
      ],
      aiTips: [
        "Ensure the wrist rotation is adequate to emphasize the chest.",
        "Monitor chest lift angle for proper muscle contraction.",
        "Detect elbow positioning and adjust for symmetry.",
        "Provide real-time posture alerts when the pose is out of balance.",
      ],
    },
  ];
}
