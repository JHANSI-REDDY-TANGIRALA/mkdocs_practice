To get the animation from the raw scans use the below code 
```matlab title="animation.m" linenums="1" hl_lines="2-4"
%% ---------------- LOAD LOG FILE ----------------
[fnm,dnm] = uigetfile('*.csv');
fprintf('Reading %s\n', fullfile(dnm,fnm));
[cfg,req,scn,det] = readMrmRetLog(fullfile(dnm,fnm));
%% ---------------- EXTRACT RAW SCANS ----------------
rawI = find([scn.Nfilt] == 1); % RAW scans
rawV = reshape([scn(rawI).scn], [], length(rawI))';
[numScans, numBins] = size(rawV);
%% ---------------- RANGE AXIS ----------------
Tbin = 32/(512*1.024); % ns
c = 0.29979; % m/ns
Rbin = c*(Tbin*(0:numBins-1))/2;
%% ================= ANIMATION CONTROL =================
scanInterval = 125e-3; % 125 ms (from MRM-RET)
speedFactor = 1.0; % <<< ONLY TUNABLE PARAMETER
frameDelay = scanInterval / speedFactor;
% ======================================================
%% ---------------- LIVE RAW SCAN ANIMATION ----------------
figure('Color','k');
h = plot(Rbin, rawV(1,:), 'LineWidth', 1.5);
grid on;
xlabel('Range (m)');
ylabel('Amplitude');
title('MRM-RET Live Raw Scan Monitor');
set(gca,'Color','k','XColor','w','YColor','w');
set(h,'Color','y');
ylim([min(rawV(:)) max(rawV(:))]);
tic;
for k = 1:numScans
set(h,'YData',rawV(k,:));
title(sprintf( ...
'Scan %d / %d | Radar Time = %.2f s | Speed × %.2f', ...
k, numScans, (k-1)*scanInterval, speedFactor));
drawnow;
pause(frameDelay);
end
toc;

```

