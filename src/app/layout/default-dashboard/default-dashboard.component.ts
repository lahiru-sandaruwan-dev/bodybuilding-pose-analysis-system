import { Component } from '@angular/core';

@Component({
  selector: 'app-default-dashboard',
  templateUrl: './default-dashboard.component.html',
  styleUrls: ['./default-dashboard.component.scss']
})
export class DefaultDashboardComponent {
  items: any
  poseAccuracyChartData: any;
  injuryRiskChartData: any;
  muscleImbalanceChartData: any;
  chartOptions: any;
  feedbackMessage: string = 'Your right arm needs slight adjustment for better symmetry.';

  sessionHistory = [
    { date: '2025-03-20', pose: 'Front Double Biceps', correctness: '90%', injuryRisk: 'Low' },
    { date: '2025-03-19', pose: 'Front Lat Spread', correctness: '78%', injuryRisk: 'Moderate' },
    // Add more
  ];

  ngOnInit(): void {
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    };

    this.poseAccuracyChartData = {
      labels: ['Correct', 'Incorrect'],
      datasets: [
        {
          data: [80, 20],
          backgroundColor: ['#42A5F5', '#EF5350'],
        },
      ],
    };

    this.injuryRiskChartData = {
      labels: ['Biceps', 'Triceps', 'Shoulders'],
      datasets: [
        {
          label: 'Risk (%)',
          backgroundColor: '#FFA726',
          data: [20, 35, 15],
        },
      ],
    };

    this.muscleImbalanceChartData = {
      labels: ['Left Biceps', 'Right Biceps', 'Left Shoulder', 'Right Shoulder'],
      datasets: [
        {
          label: 'Strength Level',
          data: [80, 95, 70, 90],
          fill: true,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    };
  }
}
