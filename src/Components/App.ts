import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import './CpuMonitor';

@customElement('app-component')
export class App extends LitElement {
	createRenderRoot() {
		return this;
	}

	render() {
		return html`<div class="app">
			<div class="window-controls">
				<div class="widget-move-bar"></div>
				<span class="window-buttons">
					<button
						id="minimize-button"
						class="window-button"
					>
						-
					</button>
				</span>
			</div>
			<div class="content">
				<cpu-monitor></cpu-monitor>
				<div
					id="gpu-usage-container"
					class="grid-container"
				>
					<div
						id="gpu-usage-icon"
						class="background-icon grid-item"
					>
						<div
							id="gpu-usage-circle"
							class="circle spinning-icon"
						></div>
					</div>
					<div
						id="gpu-usage-info"
						class="grid-item"
					>
						<div>[GPU]</div>
						<div
							id="gpu-usage-name"
							class="text-ellipsis"
						>
							...
						</div>
						<div class="filling-bar-container">
							[
							<span class="filling-bar-wrapper">
								<span
									id="gpu-usage-percentage-bar"
									class="filling-bar"
								>
									<span class="filling-line-trashold trashold-40"></span>
									<span class="filling-line-trashold trashold-75"></span>
									<span class="filling-line-trashold trashold-90"></span>
								</span>
							</span>
							<span
								id="gpu-numbers-percentage"
								class="filling-bar-usage-number"
								>...%</span
							>
							]
						</div>
						<div class="filling-bar-container">
							[
							<span class="filling-bar-wrapper">
								<span
									id="gpu-usage-temperature-bar"
									class="filling-bar"
								>
									<span class="filling-line-trashold trashold-40"></span>
									<span class="filling-line-trashold trashold-75"></span>
									<span class="filling-line-trashold trashold-90"></span>
								</span>
							</span>
							<span
								id="gpu-numbers-temperature"
								class="filling-bar-usage-number"
								>...°C</span
							>
							]
						</div>
					</div>
				</div>
				<div
					id="ram-container"
					class="grid-container"
				>
					<div
						id="ram-icon"
						class="background-icon grid-item"
					></div>
					<div class="grid-item">
						<div>[RAM]</div>
						<div
							id="ram-banks"
							class="text-ellipsis"
						>
							...
						</div>
						<div class="filling-bar-container">
							[
							<span class="filling-bar-wrapper">
								<span
									id="ram-usage-percentage-bar"
									class="filling-bar"
								>
									<span class="filling-line-trashold trashold-40"></span>
									<span class="filling-line-trashold trashold-75"></span>
									<span class="filling-line-trashold trashold-90"></span>
								</span>
							</span>
							<span
								id="ram-numbers-percentage"
								class="filling-bar-usage-number"
								>...%</span
							>
							]
						</div>
					</div>
				</div>
				<div
					id="motherboard-container"
					class="grid-container"
				>
					<div
						id="motherboard-icon"
						class="background-icon grid-item"
					></div>
					<div class="grid-item">
						<div>[MotherBoard]</div>
						<div
							id="motherboard-manufacturer"
							class="text-ellipsis"
						>
							...
						</div>
						<div
							id="motherboard-model"
							class="text-ellipsis"
						>
							...
						</div>
						<div
							id="motherboard-bios"
							class="text-ellipsis"
						>
							...
						</div>
					</div>
				</div>
				<div
					id="os-container"
					class="grid-container"
				>
					<div
						id="os-icon"
						class="background-icon grid-item"
					></div>
					<div class="grid-item">
						<div>[OS]</div>
						<div
							id="os-distro"
							class="text-ellipsis"
						>
							...
						</div>
						<div
							id="os-arch"
							class="text-ellipsis"
						>
							...
						</div>
					</div>
				</div>
			</div>
		</div>`;
	}
}
