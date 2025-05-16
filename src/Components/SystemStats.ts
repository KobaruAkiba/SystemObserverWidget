import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('system-stats')
export class SystemStats extends LitElement {
	@property({ type: String })
	cpuUsage = '20%';

	render() {
		return html`
			<div class="system-stats">
				<h2>System Stats</h2>
				<p>CPU Usage: ${this.cpuUsage}</p>
				<p>Memory Usage: 60%</p>
				<p>Disk Space: 80%</p>
			</div>
		`;
	}
}

