---
date: 
    created: 2025-10-06
    updated: 2026-01-30

links: #related links on left
    - SIMD: posts/simd/simd.md
    - RISC-V: posts/riscv/riscv.md

categories:
    - Research

tags:
    - Signal Processing
    - Radar
    
authors:
    - Jhansi
    - Anish

pin: true
---

# Human Activity and Vital Sign Recognition using Ultra Wide Band Radar
![title radar](resp.jpg){width="500"}

UWB Radar, a solution to both contact-free respiration monitoring and non-invasive human motion detection.

<!-- more --> 

Respiratory rate is an essential clinical parameter, often assessed using ECG-based systems; however, prolonged electrode-based monitoring may cause discomfort or be unsuitable for patients with skin complications. UWB radar provides a contact-free alternative that can overcome such limitations. 

Additionally, UWB radar plays a crucial role in human activity detection due to its high-resolution ranging and ability to penetrate walls, while preserving privacy compared to cameras or wearables. It excels in low-visibility environments, ensuring reliable activity monitoring even in darkness.
 

??? tip ":trophy: WAMS 2026 Award for Best Student Paper Award in All Tracks"
     To verify go to [WAMS 2026 student awards](https://wams2026.com/student-awards/) and scroll down to S3.
    ![At the WAMS simposium](WAMS_award.jpg)

    **What does this award mean to me?**

    This is our first research paper, so we did not expect much. All our focus was on delivering our best - whether it is organisation, replicability or transparency. Later I realized that with persistence and collaboration we can achieve great things in life.

    Additionally, we are grateful to our mentor [Dr. Puli Kishore Kumar](https://nitandhra.ac.in/dept/ece/20015) for guiding us and has provided the opprtunity to work with state of the art radar sensor. Finally I would like to acknowledge [Anish](https://github.com/anish609609) for his unwavering support and hardwork. His dedication to this work is monumental. 

???+ abstract
    This work presents a lightweight framework for UWB-based human activity classification and respiration rate estimation utilizing TDSR P452 ultra-wideband (UWB) radar sensor. The proposed approach classifies four distinct activities: sitting, standing, falling, and walking. Human activity signatures are extracted from the received radar signals using motion filtering and background subtraction to facilitate activity classification. Four filtering techniques—namely FIR2, FIR4, IIR2, and a second-order difference filter—undergo evaluation for motion detection, with the second-order difference filter demonstrating the most effective performance. Radar-based vital sign monitoring offers a contact-free and non-invasive approach for medical and surveillance applications. Band-pass filtering and peak detection are employed to estimate the respiration rate of the subject from the received radar signals. Comparison with manual participant breathing counts validates the accuracy of the estimated respiration rates. 

--------------------------------

## Tools
[TDSR P452 Radar](https://tdsr-uwb.com/radar-sensor/)<br>
[MRM GUI](https://tdsr-uwb.com/radar-software/)<br>
[Matlab R2025b](https://in.mathworks.com/products/new_products/release2025a-2025b.html) 

-----------------------------

## Radar basics

### What is a Radar?
The word radar comes from the acronym **RA**dio **D**etection **A**nd **R**anging. As the name implies, radars use radio waves to determine the distance and velocity of the targets they hit. A radar system usually consists of a transmitter to send out radio signals and a receiver to catch any reflected energy from targets.

![radar working](propagation.png)

### Early use of radars
Radars were first used to lift the fog of war. In 1940, Great Britain utilized a network of radar installations known as the **Chain Home system** to provide crucial early warning during the Battle of Britain. By detecting incoming German bombers from as far away as 160 miles, these systems allowed the British to strategically concentrate their Spitfire and Hurricane interceptors against attacking forces.

This timely intelligence helped the British achieve numerical parity and successfully deny Germany the air superiority required for a planned invasion. Consequently, the invasion of Great Britain was postponed indefinitely, securing a vital staging area for the Allies.

### Applications
+ Surveilance
+ Tracking
+ Fire control
+ Target ID/discrimination
+ Ground surveillance/reconnaissance
+ Ground mapping
+ Moving target detection
+ Air traffic control
+ Missile seekers

### Attributes
+ Long range
+ All weather
+ Day/night
+ 3-space target location
+ Reasonably robust against countermeasures

### TDSR P452 radar sensor  
![P452](p452.jpg){width="100", align="left"}

The P452 UWB Module is an Ultra Wideband radio transceiver designed for precise ranging, communication, and radar applications, featuring high accuracy and low power consumption. It operates using Two-Way Time-of-Flight technology, supports multiple communication protocols, and can function in various radar configurations.<br>

The radar sensor consists of two omnidirectional antennas. We operated the radar in monostatic mode, so one antenna is the transmitter and the other is the receiver. Additionally, it has 2 usb B ports (one for data and the other is for power.), 1 ethernet, and GPIO ports (for API control). 

### Technical Specifications
![Specs](specs.png)

| Specification | Description                          |
| ----------- | ------------------------------------ |
| **Transmitted pulse**      |      Derivative of the Gaussian pulse, specifically a 500ps monocycle waveform as shown below. The waveform starts as a Gaussian pulse but is then filtered to meet the regulatory emissions mask.  |
| **Pulse duration**     |   1ns |
| **Pulse repetition frequency**   |     10MHz|
| **Pulse spectral density** |  -41 dBm/MHz (max) |
|**Antenna** | planar elliptical dipole Ultra-wideband (UWB) antenna |
| **Polarisation** |  linear polarisation |
| **centre frequency** | 4.3GHz |
| **Bandwidth** | 600MHz, functioning within a range of 4.0 to  4.6GHz |
| **operating modes** |monostatic (transmitter and receiver are co-located or same antenna), bistatic, or multistatic|
|Transmitted pulse | ![transmitted pulse](Transmitted_pulse.png)|
| Received pulse in frequency and time domain | ![pulse freq](pulse_freq.png) |


### Working principle
![TX and RX](TX_RX.png)

Pulse radar systems send out short bursts or pulses of high energy waves followed by long periods of silence, where the receiver is listening for the reflected signal.

![pulse transmission](pulse.png)

1. So the transmitted waveform in pulse radar would look something like in fig 1. Initially, the transmitter is idle and then it transmits the signal for some period (known as pulse width) and then stops. (Note: the illustration assumes the carrier wave contains only 1 frequency component. For P452, the frequency spectrum is spread over from 4.0 to 4.6GHz)

2. Assume the transmitted pulse has frequency of 4.3GHz. Since the transmit frequency is so high, it can be represented as an outline of the amplitude of the signal, as shown in fig 2. This fixed frequency scheme is called a rectangular pulse.

3. In a pulsed radar system, the pulse has to radiate out, reflect off of an object and return to the radar before the next pulse is sent out. This is so that there is no ambiguity as to which pulse the echo belongs to. It's always the pulse that is just sent. But because of this if we want a radar that can operate over long distances, then we need to allow enough time between pulses to account for the speed of light travel to and from the object. In fig. 3 we are sending out a pulse every 0.1μs or with a pulse repetion frequency of 10MHz.

4. Within the maximum umambiguious range, each pulse will have an associated echo pulse. These signals are much weaker than the transmit pulse, as much of the power is lost to the environment, shown in fig. 4.

5. The received signal will look something like in fig.5, as electronics and environment introduce noise into the signal. The range to the object is calculated by determining the round trip distance that light would have travelled in Δt time.

-------------------------

## MRM RET GUI
The Monostatic Radar Module Reconfiguration and Evaluation Tool (MRM RET) is a Microsoft 
Windows-based Graphical User Interface (GUI) program that provides an easy and illustrative means 
for (a) manipulating the configuration parameters of either TDSR’s P400 series of UWB modules and 
(b) demonstrating their operation as Ultra Wideband (UWB) monostatic radar sensors. 

### Configuration Tab
![configuration tab](config_tab.png)

| Field       | Description  | Range| Example |
| ----------- | -------------|--------|--------|
| `PII`       | Pulse Integration Index: Since the MRM has been designed for coherent operation, it is possible to integrate multiple scans and thereby improve the received Signal-to-Noise Ratio (SNR). Each time the integration is doubled, the SNR of the received signal will improve by 3dB. |6 - 15 (2^6 - 2^15 pulses) |PII of 15 will integrate 32,768 (2^15) scans and thereby provide an SNR improvement of 45 dB. [Learn more](https://youtu.be/NtyU6aKZ-cY?si=b-tJSHsP1nvpw3Ne&t=527)| 
| `Transmit Gain`       |  When set to zero, the unit will transmit at the minimum  power supported by the MRM.   Setting to transmit gain to a value of 63 will set the unit to maximum transmit power. | 0 - 63 | Recommended - 63|
| `Start scan`    | While this field is entered in increments of picoseconds (ps), the MRM converts the input values into “bins,” where each bin is 1.907 ps | varies depending on swath| Because this conversion involves rounding, the value shown in Scan Start may not match the value originally entered by the user.  For example, setting a Scan Start value to 5000 will actually result in the Scan Start value being set to 4999. |
| `Scan stop` | While this field is entered in increments of ps, it is constrained in two ways. First, the MRM converts the input values from ps into “bins,” where each bin is 1.907ps. Second, the Scan Stop entry is further constrained by the Scan Start point and the MRM rake receiver architecture. The MRM produces a radar scan using several samplers acting in parallel as a rake  receiver. | varies depending on swath | Because of this architecture, the difference between Scan Start and Scan Stop must be in even multiples of 5859.36 ps.  This quantizes the radar scan data into blocks of 96 readings covering 5859.36 ps.|
| `Step size` |  This parameter controls the resolution with which the radar waveaform is captured. | recommended - 32 bins (equivalent to 1.907*32 ps) | In other words with a step size of 32, the received radar waveform will be measured every 61ps. |


??? tip ":star: How to select scan start and stop values"
    ![scan interval](scan_interval.png)
    Each scan requires a certain amount of time to complete.  This time is a function of the integration rate and the size of the scan window (difference between the Scan Start and Scan Stop times).  The time required is determined by the following equations. <br>
    Scan time (µs) = (# of quanta in scan window) * (0.792 µs) * (2^(Pulse Integration Index)) <br>
    Where a quanta (i.e., the rake sampler size) = 5859 ps 
     
    For example, selecting a Scan Start value of 10,000 ps and a Scan Stop value of 21,000 ps results in a requested swath size of 11,000 ps.  Dividing 11,000 by 5859 gives a value of 1.87 quanta.  The MRM will round this up to 2 quanta.  If the user requests a PII of 13, then the minimum scan time (or fastest update rate) will be 12,977 µs (77 Hz).  If the operator enters an Interval higher than this, then the radar will idle between scans. If the operator enters an Interval smaller than this, then the radar will operate as fast as possible.  


### Control Tab
![control tab](control_tab.png)

Radar scans can be started and stopped by clicking on either the Start Scanning or Stop Scanning buttons. 

| Field       | Description  |  
| ----------- | -------------|
| `Scan control`| By selecting the **Continuous** option, the user is requesting that scans be generated indefinitely at an interval defined by the contents of the “Interval (microseconds)” box.<br> By selecting the **Count** option, the user is requesting that MRM produce the number of scans indicated in the Count field at an interval defined by the contents of the “Interval (microseconds)” field. The maximum allowed interval is 2,000,000 microseconds.    
| `Start scanning`|  When Start Scanning is selected, the Scan Message ID number will be set equal to the present Message ID number and scanning will begin. Scanning will be executed based on the contents of the Scan Control box. 
| `Stop scanning`| Clicking on Stop Scanning will stop the scans and will reset the Scan Message ID number to the current value of the Message ID number. 

### Scan Tab
The Scan Tab is used to view scan parameters as well as raw and processed data. An almost live received signal can be observed here.
![scan tab](scan_tab.png)

| Field       | Description  |  
| ----------- | -------------|
| `Scan data plot`| This is a plot of radar scan amplitude or reflectivity (y-axis) as a function of time in nanoseconds (ns) (x-axis). (The API reports the reflectivity as an integer value and time in ps.)  The vertical scale is set when the Scan Tab is selected.  The horizontal scan uses the Scan Start value as the origin and sets that maximum so that it includes the Scan Stop value. |
| `First detection`|  This is an approximate measurement of the distance, in meters, from the Scan Start point to the First Detection. <br> Distance = (Detection_ps – ScanStart_ps)*(Seconds/picoseconds)*C/2 |

### MRM Server tab
While the MRM Service normally runs on the same PC on which MRM RET is operating, it is 
possible to run the MRM Service from a different PC.  To cause the service to operate on a different 
machine, the user should click the “Disconnect” button, enter the IP address of the target PC, and then 
click the “Connect” button. 
![server tab](server_tab.png)

| Filter settings | Description  |  
| ----------- | -------------|
|`Raw` | Clicking this box will pass raw scans from the MRM Server to MRM RET, enabling the display of MRM raw radar scan data. |
|`Threshold multiple` | The value selected will set the sensitivity of the detector. The Threshold Multiple is the number of standard deviations that a received signal must deviate from nominal in order to generate a detection. Set to 5.


### Logging Tab
![logging tab](logging_tab.png)

The Logging Tab is provided by MRM RET to support data collection and post-processing analysis. The logfile is a comma-separated variable ASCII .csv text file. 

| Field       | Description  |  
| ----------- | -------------|
| `Directory` | Logfiles will be stored in the directory indicated in the “Directory” field. The user may change the target directory by using the “change” button|
| `Logfile Prefix` | The logfile names are designated by the “Logfile Prefix” field.  The user can change the name by entering the desired prefix name in the ‘Logfile Prefix” field.|
| `Start logging` | When the “Start Logging” button is clicked, MRM RET will add a three digit suffix number to the file name. This name will be displayed on the screen. Each time the log is stopped and started, this suffix number will be incremented. If you don't log the data it cannot be retrived in the future. So log data before every scan if you want to save it. |
| `Stop logging` | When the “Stop Logging” button is clicked, MRM RET will stop logging and the logfile will be closed. <br> **DO NOT FORGET TO CLICK "STOP LOGGING" BUTTON AT THE END OF EACH SCAN SESSION. ELSE THE DATA CANNOT BE PLOTED** |
|`New logfile` | Clicking the “New Logfile” button will close the existing file, open a new logfile with an incremented number, and continue logging. This can be accomplished in the middle of a scanning sequence because clicking this button does not stop and restart the MRM, it merely redirects that data flow to a new file.|

### Initial setup
We used the USB interface which is the simplest just connect directly to the computer. It works fine for the MRM configuration, but can become a bottlneck(data rates are slower and the lag is noticable after a few minutes). If you need to operate in the Rangenet configuration, ethernet is preferablable.

1. Connect the MRM to the node and configure the settings in the configuration tab. Next click on the `get Configuration button` and verify the values. Once satisfied click on `Set Configuration` button, this will save the values to the node. 

2. Select a logging folder and start logging (naming convention is important) in the logging tab. Navigate to scan tab, set the interval and scan counter to the desired values and start scanning. Once it's done, be sure to stop logging in the logging tab (we had to repeat so many experiments just because i forgot to stop the logging and all the data was lost).

3. Plot the data in the .csv file in matlab.

### Data organization (csv file)
--------------------------------


## A. Human Activity Signatures

### Radar Signature
A radar signature consists of information about characteristic echo signals of a reflecting object (target). Like a fingerprint, it is a way to determine the type of target.

??? example "Example"
    **Weather Radar**<br>
    The WSR-88D(Weather Surveillance Radar, 1988 Doppler) operates by sending out directional pulses at several different elevation angles, which are microseconds long, and when the pulse intersects water droplets or other artifacts, a return signal is sent back to the radar. From this return signal, the diameter of the object, along with distance, and intensity can be calculated, along if the object is moving toward or away from the radar.

    Hook echo 

    ![hook echo](hook_echo.png)

    The hook echo is the classic radar signature for tornadic supercells, appearing as a curved, hook-shaped appendage on reflectivity scans.

    Recognition of the hook echo has been around for decades; even before Doppler radar was invented and instituted in forecast offices, forecasters issued tornado warnings solely based on the visual appearance of a hook echo on radar.

-----------------------

## B. Respiration rate measurement

-------------------------
## Credits
1. To Prof. Robert M. O'Donnell, MIT Lincoln Laboratory for the lecture series: Introduction to Radar Systems.
2. To Brian Douglas, Matlab techtalks for the video on Pulse-Doppler Radar.
3. SOURCE: Monostatic Radar Module Reconfiguration and Evaluation Tool (MRM RET) User Guide 