# Platform Requirements

- [[#Overview|Overview]]
- [[#Purposes|Purposes]]
- [[#Limitations|Limitations]]
- [[#Backgrounds|Backgrounds]]
- [[#Requirements|Requirements]]
- [[#References|References]]

## Purposes

This document has the following purposes:
- Give background information on the target market for Vanch.
- Define the high-level requirements of the Vanch platform.

## Limitations

- Though the described high-level requirements reinforces use cases, they are not to be treated as such.
- For business use cases, see the platform components' respective requirement documents.

## Overview

Vanch is a demand-responsive transport (DRT) platform.
Vanch aims to support functional scenarios presented by the dial-a-ride problem (DARP).

## Backgrounds

In recent years, there has been a resurgence of interest in demand-responsive transport (DRT).
This has been fueled in part by concerns for the environment.
Technological developments have also contributed to the revitalization.
This new model of flexible public transport introduces a host of new optimization problems.
The arising related challenges are grouped under a common Dial-a-Ride Problem (DARP) for easy classification.

DARP typically has the following characteristics:
- Each user has to be delivered from a requested origin (pick-up) to a requested destination (drop-off).
- Each user can specify the earliest and latest times of pick-up and/or drop-off.
- Vehicles are dispatched by a service provider to handle users' requests.
- Each vehicle has a starting/ending location before/after a trip.
- Each vehicle has a load limit - the max number of users that the vehicle can accommodate at the same time.

DARP can be categorized into 4 categories:
- Static & deterministic (SD-DARP).
- Static & stochastic (SS-DARP).
- Dynamic & deterministic (DD-DARP).
- Dynamic & stochastic (DS-DARP).

## Requirements

- Vanch supports SD-DARP.
- Vanch's deployment can be configured to support different DARP functional scenarios.
- Vanch's deployment can be configured to support different business use cases.

## References

- [A survey of DARP: Literature Review and Recent Developments.](2018-Ho--a-survey-of-dial-a-ride-problems-literature-review-and-recent-developments.pdf)