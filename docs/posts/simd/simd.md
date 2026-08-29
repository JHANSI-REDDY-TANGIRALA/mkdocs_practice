---
date: 
    created: 2026-01-09 
    updated: 2026-04-15

links: #related links on left
    - RADAR: posts/radar/radar.md
    - RISC-V: posts/riscv/riscv.md

categories:
    - Projects
tags: 
    - SIMD
    - Verilog
    - Computer Architecture
    - Xilinx vivado

authors:
    - Jhansi
---

# Custom Hardware Accelerator for Matrix Multiplication Using SIMD Processing Element  
Besides the long title, what does fluid dynamics, convolutional neural networks, and computer graphics all have in common? That's right *matrix multiplications*.<br>
So, here's one approach to accelerate those computations. :key: Paralellism

<!-- more --> 

???+ abstract
    Matrix multiplication is computationally intensive, creating a performance bottleneck for real-time processing on traditional sequential processors. To address this, we present a lightweight Single Instruction Multiple Data (SIMD) hardware accelerator implemented on the PYNQ-Z2 FPGA using Xilinx Vivado. The architecture leverages parallel Processing Elements (PEs), Block RAM (BRAM), and a Finite State Machine (FSM) to execute row-wise matrix operations in parallel. Operating at 100 MHz, the design completes matrix multiplication in just 11 clock cycles (0.11μs) while utilizing less than 15% of total FPGA resources. The accelerator achieves significant power and computational speedup over CPU-based execution, providing a strong foundation for future integration with AXI DMA to enable full-scale real-time deployments.   

## Tools
[Pynq z2](https://www.tulembedded.com/FPGA/ProductsPYNQ-Z2.html)<br>
[Jupyter notebook](https://jupyter.org/)<br>
[Xilinx Vivado 2024.2](https://www.xilinx.com/support/download.html/content/xilinx/en/downloadNav/vivado-design-tools/2024-2.html) 

## Introducton
Whether it is solving large systems of equations in scientific simulations, transforming 3D objects in graphics, or computing activations in neural networks,matrix multiplication forms the computational backbone of these domains.

However, matrix multiplication is computationally intensive, and traditional sequential CPUs are increasingly becoming a bottleneck due to limited parallelism. 

For example, even a simple CNN trained on datasets like CIFAR-10 requires approximately 0.78 million multiplications for just a single convolution layer. Modern deep networks scale this to billions of operations. 

In this project, we present one such approach by designing a custom matrix multiplication accelerator on the PYNQ-Z2 platform, leveraging parallelism to significantly improve computation speed.

### General matrix multiplication
An unpipelined CPU takes 45 clock cycles to compute the entire matrix C (Assuming it takes 1 clock cycle for multiplication and addition each).