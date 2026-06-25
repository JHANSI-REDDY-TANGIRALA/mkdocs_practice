This is some examples of content tabs.

### Generic Content

=== "python"

    ```py
    def main():
        print("Hello world!")

    if __name__ == "__main__":
        main()
    ```

=== "matlab"

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

=== "verilog"

    ```verilog
    `module algorithm1_des #(parameter VECTOR_LEN = 8,
                            parameter ROW_A = 3,       
                            parameter COL_A = 3,  
                            parameter ROW_B = 3,       
                            parameter COL_B = 4)
                            (input clk,
                            input rstn,
                            input [(ROW_A * COL_A * VECTOR_LEN) - 1:0] A,
                            input [(ROW_B * COL_B * VECTOR_LEN) - 1:0] B,
                            output reg [(ROW_A * COL_B * VECTOR_LEN) - 1:0]C);
    

                
    //register array declarations              
    reg [(COL_A * VECTOR_LEN)-1:0] v0;
    reg [(COL_B * VECTOR_LEN)-1:0] v1;
    reg [(COL_B * VECTOR_LEN)-1:0] v2;

    integer i, j, k; 
    reg [VECTOR_LEN-1:0] s;

    //matrix multiplication
    always@(posedge clk or negedge rstn)
    begin
        if (!rstn)
        begin
            //Initialize all the vector register elements to zero.
            v0 <= 'd0;
            v1 <= 'd0;
            v2 <= 'd0;
                
            
        end
        //matrix multiplication
        else
        begin
            for (i = 0; i < ROW_A; i = i + 1)
            begin
                    v0 = A[i * COL_A * VECTOR_LEN +: (COL_A * VECTOR_LEN)];
                    v2 = 'd0;
                    
                    for (j = 0; j < COL_A; j = j + 1)
                    begin
                        v1 = B[j * COL_B * VECTOR_LEN +: (COL_B * VECTOR_LEN)];
                        s = v0[VECTOR_LEN-1:0];  
                        
                        //multiply accumulate                        
                        for (k = 0; k < COL_B; k = k + 1)
                            v2[k*VECTOR_LEN +: VECTOR_LEN] = v2[k*VECTOR_LEN +: VECTOR_LEN] + s * v1[k*VECTOR_LEN +: VECTOR_LEN];
    
                        v0 = v0 >> VECTOR_LEN; 
                    end   
                    
                    C[i * COL_B * VECTOR_LEN +: (COL_B * VECTOR_LEN)] = v2;
            end
        end           
    end
    endmodule 
    ```