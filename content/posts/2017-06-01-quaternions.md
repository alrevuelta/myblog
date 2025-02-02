---
title: Encoding spatial rotation with Quaternions
date: 2017-06-01T16:43:20+05:30
slug: quaternions
draft: false
---

During my thesis, I researched different techniques for estimating the orientation of an object in a three-dimensional space. Think of your head, you can tilt left/right, look up/down, or right/left. Well, the exact position of your head can be expressed mathematically and quaternions are one of the options.

Quaternions were introduced by Hamilton (1843) and are used to represent the attitude of a rigid body in space. They can be viewed as an extension of complex numbers. A complex number can be used to represent the rotation in a two-dimensional space. A quaternion is similar, but instead of one axis it is extended to three axes. For its representation, four values are needed, where there is one real component $q_0$ and three imaginary $q_1, q_2, q_3$ ones:

$$
\textbf{q} = q_0 + q_1i + q_2j + q_3k
$$

It is also represented as a vector matrix $\textbf{q}$, where $q_1, q_2, q_3$ are multiplied by $i, j, k$ respectively.

$$
\textbf{q}=\left[ q_0\; q_1\; q_2\; q_3 \right] ^t
$$

The quaternion that represents a rotation of $\theta$ degrees around an axis defined by the vector $\textbf{n} = \left[ n_x \; n_y \; n_z \right]$ is given by:

$$
\textbf{q} = \left[ n_xi \; n_yj \; n_zk \right] \sin(\theta/2) + \cos(\theta/2)
$$

This means that a rotation of $\theta = \pi/2$ around the axis $\textbf{n} = \left[ 1 \; 0 \;0 \right]$ will correspond to a quaternion given by the following expression.

$$
\textbf{q} = \left[ \frac{\sqrt{2}}{2} \; \frac{\sqrt{2}}{2} \; 0 \; 0 \right]
$$

A quaternion is often represented as a normalized vector. It can be normalized using the following expression, where $\lvert q \rvert$ can be calculated as follows.

$$
\textbf{q}_{norm} = \frac{q}{||q||}
$$

$$
||q|| = \sqrt{q_0^2 + q_1^2 + q_2^2 + q_3^2}
$$

Different operations can be done with quaternions. Adding two quaternions $q_a + q_b$ can be done by adding each element of the vector. Multiplying by a scalar, is done by multiplying the scalar by each element, like if it were a simple two or three-dimensional vector. One of the most important operations is the product.

Let $(a_1 + b_1i + c_1j + d_1k)$ be the $q_a$ quaternion and $(a_2 + b_2i + c_2j + d_2k)$ the second quaternion $q_b$. They can be multiplied $q_a q_b$ by using the Hamilton product which is given by the following expression. Note that the product does not have the commutative property, so $q_a q_b$ is not the same as $q_b q_a$.

$$
\begin{split}
(a_1 + b_1i + c_1j + d_1k) (a_2 + b_2i + c_2j + d_2k) = \\
a_1a_2 - b_1b_2 - c_1c_2 - d_1d_2 + \\
  (a_1b_2 + b_1a_2 + c_1d_2 - d_1c_2)i +\\
 (a_1c_2 - b_1d_2 +c_1a_2 + d_1b_2)j +\\
 (a_1d_2 + b_1c_2 - c_1b_2 + d_1a_2)k
\end{split}
$$

The following expression determine all the possible combinations of $i,j,k$ multiplications, so for example $k = ij$ or $ji = -k$

$$
i^2 = j^2 = k^2 = ijk = -1
$$

Quaternions have a very interesting property, the Hamilton product, because it can combine two rotations into only one. For example in the previous quaternion, which represents a rotation of $\theta = \pi/2$ in the axis $\textbf{n} = \left[ 1 \; 0 \;0 \right]$ is used two times, the result rotation will be $\theta = \pi$ in the same axis. Doing the maths, the Hamilton product of that quaternion multiplied with itself, yields:

$$
\textbf{q} = \left[ 0 \; 1 \; 0 \; 0 \right]
$$

Which is the same as substituting $\theta = \pi$ and $\textbf{n} = \left[ 1 \; 0 \;0 \right]$. Both results are the same.

Since there are different ways of representing the attitude of a body in the space, it is important to know how to change between different representations. For example, the ZYX or 3,2,1 conversion conversion matrices are given. Using the following Euler angles $\theta_1, \theta_2, \theta_3$ can be converted to the quaternion representation.


$$
 \begin{pmatrix}
	q_0\\
	q_1\\
	q_2\\
	q_3\\
 \end{pmatrix} =  \begin{pmatrix}
	\sin(\theta_1/2)  \sin(\theta_2/2) \sin(\theta_3/2) + \cos(\theta_1/2)\cos(\theta_2/2)\cos(\theta_3/2)\\
	-\sin(\theta_1/2)\sin(\theta_2/2)\cos(\theta_3/2) + \sin(\theta_3/2)\cos(\theta_1/2)\cos(\theta_2/2)\\
	\sin(\theta_1/2)\sin(\theta_3/2)\cos(\theta_2/2) + \sin(\theta_2/2)\cos(\theta_1/2)\cos(\theta_3/2)\\
	\sin(\theta_1/2)\cos(\theta_2/2)\cos(\theta_3/2) - \sin(\theta_2/2)\sin(\theta_3/2)\cos(\theta_1/2)\\
 \end{pmatrix}
$$

The following expressions allow the conversion between quaternion to rotation matrix and from quaternion to Euler.


$$
R=
 \begin{pmatrix}
	2q_0^2 -1 + 2q_1^2 & 2q_1q_2 + q_0q_3 & 2q_1q_3 - q_0q_2\\
	2q_1q_2 - q_0q_3 & 2q_0^2 -1 +2q_2^2 & 2q_2q_3 + q_0q_1 \\
	2q_1q_3 + q_0q_2 & 2q_2q_3 - q_0q_1 & 2q_0^2 -1 + 2q_3^2\\
 \end{pmatrix}
$$

$$
 \begin{pmatrix}
	\phi \\
	\theta \\
	\psi \\
 \end{pmatrix}=
 \begin{pmatrix}
	\arctan(\dfrac{2q_2q_3 - q_0q_1}{2q_0^2-1+2q_3^2}) \\
	\arctan \left( \dfrac{2q_1q_3 + q_0q_2}{\sqrt{1-(2q_1q_3+q_0q_2)^2}} \right) \\
	\arctan(\dfrac{2q_1q_3-q_0q_3}{2q_0^2-1+2q_1^2}) \\
 \end{pmatrix}
$$